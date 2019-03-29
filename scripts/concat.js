/* global $, Router, Data, UIElements, Collections, Controls, Core, Analytics, Events, Actions, WPGraphQL, firebase*/
((window, document) => {
    'use strict';
    let init = () => {
        Router.route();
        Data.initializeFirebase();

        UIElements.cacheElements();
        Controls.cacheElements();
        Events.bindEvents();

        //UIElements.showSpinner(UIElements.$el.spinner);
        UIElements.showSpinner(
            UIElements.$el.linksContainer
        );
        //UIElements.showProgressBar(UIElements.$el.linksContainer);
        //UIElements.showProgressBar(UIElements.$el.socialLinksContainer);

        Data.getVideoSources()
            .then(Actions.methods.parseVideoSources)
            .catch(error => {
                console.log(
                    'Error getting video source array: ',
                    error
                );
            })
            .then(sources => {
                Collections.paths.video_sources = sources;
                // randomize video
                /*

                Actions.methods.switchBackgroundVideo(
                    Collections.paths.video_sources,
                    UIElements.$el.background.video_element,
                    UIElements.$el.background.video_source
                );
                */
            });

        Actions.methods.displayCopyrightYear(
            UIElements.$el.footer.copyright
        );

        Data.getLinks()
            .then(Actions.methods.parseLinks)
            .catch(error => {
                console.log(
                    'Error getting links array: ',
                    error
                );
            })
            .then(links => {
                Collections.links.project_links = links.filter(
                    element => element.type === 'project'
                );
                Collections.links.social_links = links.filter(
                    element => element.type === 'social'
                );
                UIElements.displayLinks(
                    Collections.links.project_links,
                    UIElements.$el.linksContainer
                );
                UIElements.displayLinks(
                    Collections.links.social_links,
                    UIElements.$el.socialLinksContainer,
                    false,
                    true
                );
                UIElements.cacheElements();
                Events.bindEvents();
            });
        if (Data.ui.isPendingRedirect()) {
            Data.ui.start(
                UIElements.$el.firebaseUILoginFormContainer,
                {
                    signInOptions: [
                        firebase.auth.EmailAuthProvider
                            .PROVIDER_ID
                    ]
                }
            );
        }
        if (
            UIElements.elementStringInPage(
                UIElements.$el.firebaseUILoginFormContainer
            )
        ) {
            Data.ui.start(
                UIElements.$el.firebaseUILoginFormContainer,
                {
                    callbacks: {
                        signInFailure: () => {
                            console.log('Sign-In Failure');
                        },
                        uiShown: () => {
                            // The widget is rendered.
                            // Hide the loader.
                            // document.getElementById('loader').style.display = 'none';
                            UIElements.showFirebaseUILoginFormTrigger(
                                Controls.$el
                                    .show_firebase_auth_form
                            );
                        }
                    },
                    signInOptions: [
                        firebase.auth.EmailAuthProvider
                            .PROVIDER_ID
                    ]
                }
            );
        }
        WPGraphQL.getWPGraphQLPages()
            .then(res => res.json())
            .then(res => {
                console.log(res.data);
                //console.dir(res);
                //console.log('done');
            });
        console.log('testing live reload');
    };
    $(document).ready(init);
})(window, document);
'use strict';

((window, Actions) => {
    Actions.methods = {
        switchBackgroundVideo: (arr, $el_video, $el_source) => {
            let new_random_item = Math.floor(Math.random() * arr.length);
            $el_source.attr('src', arr[new_random_item].path);
            $el_video.load();
        },
        displayCopyrightYear: $el => {
            $el.html('&copy;' + (() => new Date())().getFullYear());
        },
        parseLinks: querySnapshot => {
            let links = [],
                linksByWeight = [];
            querySnapshot.docs.forEach(doc => {
                links.push(doc.data());
            });
            linksByWeight = links.sort((elA, elB) => {
                if (elA.weight < elB.weight) {
                    return -1;
                }
                if (elA.weight > elB.weight) {
                    return 1;
                }
                return 0;
            });
            return linksByWeight;
        },
        parseVideoSources: querySnapshot => {
            let sources = [];
            querySnapshot.docs.forEach(doc => {
                sources.push(doc.data());
            });
            return sources;
        }
    };
})(window, (window.Actions = window.Actions || {}));
/*global gtag*/
'use strict';

((window, Analytics) => {
    /**
     * Function that tracks a click on an outbound link in Analytics.
     * This function takes a valid URL string as an argument, and uses that URL string
     * as the event label. Setting the transport method to 'beacon' lets the hit be sent
     * using 'navigator.sendBeacon' in browser that support it.
     */
    Analytics.trackOutboundLink = url => {
        gtag('event', 'click', {
            event_category: 'outbound',
            event_label: url,
            transport_type: 'beacon',
            event_callback: () => {
                // document.location = url;
            }
        });
    };
})(window, (window.Analytics = window.Analytics || {}));
'use strict';

((window, document, Controls) => {
    Controls.cacheElements = () => {
        Controls.$el = {
            bg_video_switch: $('[data-ctl=bgvideoswitch]'),
            authorize_user: $('.active[data-ctl=userauth'),
            open_login_form: $('[data-ctl=loginform'),
            close_login_form: $(
                '.login-form [data-ctl=close]'
            ),
            show_firebase_auth_form: $(
                '[data-ctl=show-firebase-auth]'
            ),
            firebase_auth_form: $('[data-ctl=firebase-auth')
        };
    };
})(
    window,
    document,
    (window.Controls = window.Controls || {})
);
'use strict';

((window, document, Core) => {
    Core.Model = () => {
        let model = {},
            ajax = (method, url, args) => {
                // private function for ajax call

                // Creating a promise
                let promise = new Promise((resolve, reject) => {
                    // Instantiates the XMLHttpRequest
                    let client = new XMLHttpRequest(),
                        uri = url,
                        argcount = 0,
                        key;
                    //key = undefined;

                    if (args && (method === 'POST' || method === 'PUT')) {
                        uri += '?';
                        for (key in args) {
                            if (args.hasOwnProperty(key)) {
                                if (argcount++) {
                                    uri += '&';
                                }
                                uri +=
                                    encodeURIComponent(key) +
                                    '=' +
                                    encodeURIComponent(args[key]);
                            }
                        }
                    }

                    client.open(method, uri);
                    client.send();

                    client.onload = () => {
                        if (client.status >= 200 && client.status < 300) {
                            // Performs the function "resolve" when this.status is equal to 2xx
                            resolve(client.response);
                        } else {
                            // Performs the function "reject" when this.status is different than 2xx
                            reject(client.statusText);
                        }
                    };
                    client.onerror = () => {
                        reject(client.statusText);
                    };
                });

                // Return the promise
                return promise;
            };
        model.httpRequest = url => {
            return {
                get: args => ajax('GET', url, args),
                post: args => ajax('POST', url, args),
                put: args => ajax('PUT', url, args),
                // 'delete': function _delete(args) {
                delete: args => ajax('DELETE', url, args)
            };
        };
        return model;
    };
})(window, document, (window.Core = window.Core || {}));
/*global firebase, firebaseui, Actions */

'use strict';

((window, document, Data, Core) => {
    Data.initializeFirebase = () => {
        // Initialize Firebase
        let config = {
            apiKey:
                'AIzaSyBErwJPIqN7K-gfcUMisC594dZEHcjnzkY',
            authDomain: 'kratner-firebase.firebaseapp.com',
            databaseURL:
                'https://kratner-firebase.firebaseio.com',
            projectId: 'kratner-firebase',
            storageBucket: '',
            messagingSenderId: '386299743486'
        };
        firebase.initializeApp(config);
        Data.database = firebase.database();
        const firestore = firebase.firestore(),
            settings = {timestampsInSnapshots: true};
        firestore.settings(settings);
        Data.firestore = firestore;
        Data.getCollection = id =>
            Data.firestore.collection(id).get();
        Data.ui = new firebaseui.auth.AuthUI(
            firebase.auth()
        );
    };
    Data.getLinks = () => Data.getCollection('links');
    Data.getVideoSources = () =>
        Data.getCollection('video_sources');
})(
    window,
    document,
    (window.Data = window.Data || {}),
    (window.Core = window.Core || {})
);
/*global UIElements, Analytics, Actions, Collections, Controls, Data, firebase*/
'use strict';

((window, Events) => {
    Events.bindEvents = () => {
        UIElements.$el.link.on('click', evt => {
            Analytics.trackOutboundLink(evt.target.href);
        });
        UIElements.$el.descriptiveLink.on('click', evt => {
            $(evt.target)
                .parent()
                .find('.linkdescription')
                .addClass('reveal');
        });
        UIElements.$el.hideDescription.on('click', evt => {
            $(evt.target)
                .closest('.linkdescription')
                .removeClass('reveal');
        });
        /*
        UIElements.$el.descriptiveLink.on({
            mouseenter: evt => {
                UIElements.$el.linkDescription.css({
                    'max-height': '0px',
                    opacity: 0
                });
                $(evt.target)
                    .closest('li')
                    .find('.linkdescription')
                    .css({
                        'max-height': '800px',
                        opacity: 1
                    });
            }
        });
        UIElements.$el.linkDescription.on('click', evt => {
            $(evt.target).css({
                'max-height': '0px',
                opacity: 0
            });
        });
        */
        Controls.$el.bg_video_switch.on('click', evt => {
            Actions.methods.switchBackgroundVideo(
                Collections.paths.video_sources,
                UIElements.$el.background.video_element,
                UIElements.$el.background.video_source
            );
        });
        Controls.$el.open_login_form.on('click', evt => {
            /*
             * TODO: icon-user-check when authenticated
             */
            UIElements.showLoginForm(
                UIElements.$el.modalUnderlay
            );
        });
        Controls.$el.close_login_form.on('click', evt => {
            UIElements.closeLoginForm(
                UIElements.$el.modalUnderlay
            );
        });
        Controls.$el.authorize_user.on('click', evt => {
            Controls.$el.show_firebase_auth_form.removeClass(
                'active'
            );
            Controls.$el.firebase_auth_form.addClass(
                'active'
            );
            /*
            Data.ui.start(
                UIElements.$el.firebaseUILoginFormContainer,
                {
                    signInOptions: [
                        firebase.auth.EmailAuthProvider
                            .PROVIDER_ID
                    ]
                }
            );
            */
        });
    };
})(window, (window.Events = window.Events || {}));
'use strict';

((window, Collections) => {
    Collections.paths = {
        video_sources: []
    };
    Collections.links = {
        project_links: [],
        social_links: []
    };
})(window, (window.Collections = window.Collections || {}));
'use strict';

((window, document, Router) => {
    Router.route = () => {
        const ref = document.referrer,
            isValidUrl = string => {
                try {
                    let newUrl = new URL(string);
                    return true;
                } catch (err) {
                    return false;
                }
            },
            url = isValidUrl(ref) ? new URL(ref) : new URL(document.location);
        switch (url.pathname) {
        case '/admin.html':
            console.log('launch admin login form');
            break;
        default:
            console.log(url.pathname);
        }
        //console.log(url);
    };
})(window, document, (window.Router = window.Router || {}));
'use strict';

((window, Templates) => {
    /*
     * _ALinkElement
     * param obj = {
     *   href:      hypertext reference
     *   cssClass:  css class(es); separate multiple classes by spaces
     *   title:     title attribute
     *   target:    target attribute
     *   text:      link text
     * }
     */
    Templates._ALinkElement = obj => {
        let descriptiveLinkCSSClass =
                obj.dataDescription === '' ? '' : 'descriptive',
            href = obj.href === '' ? '' : `href="${obj.href}"`;
        return `<a 
            ${href}
            class="${obj.cssClass} ${descriptiveLinkCSSClass}"
            title="${obj.title}" 
            target="${obj.target}"
        >${obj.text}</a>`;
    };
    Templates._IconElement = icon => `<span class="icon-${icon}"></span>`;
    Templates._PaddedDiv = cssClass => `<div class="${cssClass}"></div>`;
    Templates._ProgressBar = indeterminate => {
        return indeterminate
            ? `<div class="mdprogressbar">
        <div class="line"></div>
        <div class="subline inc"></div>
        <div class="subline dec"></div>
        </div>`
            : '';
    };
    Templates._ModalUnderlay = () => '<div class="modal-underlay"></div>';
})(window, (window.Templates = window.Templates || {}));
/*
 * Refer to templates.js module
 * for string literals and information
 */
/*global $, Templates, Data, firebase */
'use strict';

((window, UIElements) => {
    UIElements.cacheElements = () => {
        UIElements.$el = {
            body: $('body'),
            background: {
                video_element: $(
                    '.video-background__video'
                ),
                video_source: $(
                    '.video-background__video > source'
                )
            },
            footer: {
                copyright: $('.copyright')
            },
            link: $('.gtag'),
            linksContainer: $('#links-container'),
            modalUnderlay: $('.modal-underlay'),
            socialLinksContainer: $(
                '#social-links-container'
            ),
            descriptiveLink: $('.descriptive'),
            linkDescription: $('.linkdescription'),
            hideDescription: $('.hidedescription'),
            spinner: $('#spinner'),
            firebaseUILoginFormContainer:
                '#firebaseui-auth-container'
        };
    };
    UIElements.showProgressBar = (
        $container,
        indeterminate = true
    ) => {
        $container
            .html('')
            .append(Templates._ProgressBar(indeterminate));
    };
    UIElements.showSpinner = ($container, show = true) => {
        if (show) {
            let spinner = show
                ? Templates._IconElement('spinner9')
                : '';
            $container.html(
                `<div class="spinner">${spinner}</div>`
            );
        } else {
            $container.html('');
        }
    };
    UIElements.displayLinks = (
        links,
        $el,
        hasPadding = true,
        inline = false,
        showDataDescription = true,
        linkFromDataDescription = true,
        dataDescriptionCSSClass = 'linkdescription',
        htmlListTag = 'ul', // stick with unordered list for now
        htmlListItemTag = 'li'
    ) => {
        let $container;
        $el.html('');
        if (hasPadding) {
            let cssPaddingClass = 'link-padding';
            $el.append(
                Templates._PaddedDiv(cssPaddingClass)
            );
            $container = hasPadding
                ? $el.find(`.${cssPaddingClass}`)
                : $el;
        } else {
            $container = $el;
        }
        $container.append($(`<${htmlListTag}>`));
        $container = $container.find(htmlListTag);
        links.forEach(element => {
            let icon =
                    typeof element.icon === 'undefined'
                        ? ''
                        : Templates._IconElement(
                              element.icon
                          ),
                text =
                    typeof element.text === 'undefined'
                        ? ''
                        : element.text,
                dataDescription =
                    typeof element.description ===
                    'undefined'
                        ? ''
                        : element.description,
                href = '',
                objALinkElement = {
                    dataDescription: dataDescription,
                    target: element.target,
                    title: element.title,
                    text: `${text} ${icon}`
                },
                aLinkElement = '',
                linkElement = '',
                linkDescription = '',
                closeIcon = Templates._IconElement(
                    'cancel-circle'
                ),
                closeDescriptionLink = '',
                dataDescriptionLink = '';
            if (linkFromDataDescription) {
                if (dataDescription === '') {
                    href =
                        element.href === ''
                            ? ''
                            : `${element.href}`;
                } else {
                    href = '';
                    dataDescriptionLink =
                        element.href === ''
                            ? ''
                            : Templates._ALinkElement({
                                cssClass: element.class,
                                  //dataDescription: element.description,
                                href: element.href,
                                title: element.title,
                                target: element.target,
                                text: Templates._IconElement(
                                      'share'
                                  )
                            });
                }
            } else {
                href =
                    element.href === ''
                        ? ''
                        : `${element.href}`;
            }
            objALinkElement.cssClass = element.class;
            objALinkElement.href = href;
            aLinkElement = Templates._ALinkElement(
                objALinkElement
            );
            closeDescriptionLink = `<span class="ctl hidedescription" title="Close">${closeIcon}</span>`;
            linkDescription =
                dataDescription === ''
                    ? ''
                    : `<p class="${dataDescriptionCSSClass}">${closeDescriptionLink} ${dataDescription} ${dataDescriptionLink}</p>`;
            linkElement = `<${htmlListItemTag}>${aLinkElement}${linkDescription}</${htmlListItemTag}>`;
            $container.append(linkElement);
        });
    };
    UIElements.showLoginForm = (
        $modalUnderlay,
        modal = true
    ) => {
        $modalUnderlay.addClass('visible');
    };
    UIElements.closeLoginForm = $modalUnderlay => {
        $modalUnderlay.removeClass('visible');
    };
    UIElements.showFirebaseUILoginFormTrigger = (
        $container,
        showElement = true
    ) => {
        showElement
            ? $container.addClass('active')
            : $container.removeClass('active');
    };
    UIElements.showFirebaseUILoginForm = (
        $container,
        showElement = true
    ) => {
        showElement
            ? $container.addClass('active')
            : $container.removeClass('active');
    };
    UIElements.elementStringInPage = el => $(el).length > 0;
})(window, (window.UIElements = window.UIElements || {}));
/*global WPGraphQL */

'use strict';

((window, WPGraphQL) => {
    WPGraphQL.queries = {
        pages: `{
            pages {
              nodes {
                id
                title
                date
              }
            }
          }
          `
    };
    WPGraphQL.sendQuery = (conn, query) => {
        return fetch(conn, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: query
            })
        });
    };
    WPGraphQL.connections = {
        wpgraphql: 'https://keithratner.live/graphql'
    };
    WPGraphQL.getWPGraphQLPages = () => {
        return WPGraphQL.sendQuery(
            WPGraphQL.connections.wpgraphql,
            WPGraphQL.queries.pages
        );
    };
})(window, (window.WPGraphQL = window.WPGraphQL || {}));
