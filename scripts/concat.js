/*global Data, UIElements, Collections, Controls, Core, Analytics, Events, Actions*/
((window, document) => {
    'use strict';
    let init = () => {
        Data.initializeFirebase();

        UIElements.cacheElements();
        Controls.cacheElements();
        Events.bindEvents();

        UIElements.showProgressBar(UIElements.$el.linksContainer);
        UIElements.showProgressBar(UIElements.$el.socialLinksContainer);

        Data.getVideoSources()
            .then(Actions.methods.parseVideoSources)
            .then(sources => {
                Collections.paths.video_sources = sources;
                // randomize video
                Actions.methods.switchBackgroundVideo(
                    Collections.paths.video_sources,
                    UIElements.$el.background.video_element,
                    UIElements.$el.background.video_source
                );
            });

        Actions.methods.displayCopyrightYear(UIElements.$el.footer.copyright);

        Data.getLinks()
            .then(Actions.methods.parseLinks)
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
            });
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
        Controls.$el = {bg_video_switch: $('[data-ctl=bgvideoswitch]')};
    };
})(window, document, (window.Controls = window.Controls || {}));
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
/*global firebase, Actions */
'use strict';

((window, document, Data) => {
    Data.initializeFirebase = () => {
        // Initialize Firebase
        let config = {
            apiKey: 'AIzaSyBErwJPIqN7K-gfcUMisC594dZEHcjnzkY',
            authDomain: 'kratner-firebase.firebaseapp.com',
            databaseURL: 'https://kratner-firebase.firebaseio.com',
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
        Data.getCollection = id => Data.firestore.collection(id).get();
    };
    Data.getLinks = () => Data.getCollection('links');
    Data.getVideoSources = () => Data.getCollection('video_sources');
})(window, document, (window.Data = window.Data || {}));
/*global UIElements, Analytics, Actions, Collections, Controls*/
'use strict';

((window, Events) => {
    Events.bindEvents = () => {
        UIElements.$el.link.on('click', evt => {
            Analytics.trackOutboundLink(evt.target.href);
        });
        Controls.$el.bg_video_switch.on('click', evt => {
            Actions.methods.switchBackgroundVideo(
                Collections.paths.video_sources,
                UIElements.$el.background.video_element,
                UIElements.$el.background.video_source
            );
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

((window, UIElements) => {
    UIElements.cacheElements = () => {
        UIElements.$el = {
            background: {
                video_element: $('#video-background'),
                video_source: $('#video-background > source')
            },
            footer: {
                copyright: $('.copyright')
            },
            link: $('.gtag'),
            linksContainer: $('#links-container'),
            socialLinksContainer: $('#social-links-container')
        };
    };
    UIElements.showProgressBar = ($container, indeterminate = true) => {
        if (indeterminate) {
            $container.html('').append(`<div class="mdprogressbar">
                <div class="line"></div>
                <div class="subline inc"></div>
                <div class="subline dec"></div>
                </div>`);
        }
    };
    UIElements.displayLinks = (
        links,
        $el,
        hasPadding = true,
        inline = false
    ) => {
        let $container;
        if (hasPadding) {
            $el.html('').append('<div class="link-padding"></div>');
            $container = hasPadding ? $el.find('.link-padding') : $el;
            if (inline) {
                $container.append('<p>');
                $container = $container.find('p');
            }
        } else {
            $container = $el;
            if (inline) {
                $container.html('').append('<p>');
                $container = $container.find('p');
            }
        }
        links.forEach(element => {
            let icon =
                    typeof element.icon === 'undefined'
                        ? ''
                        : `<span class="icon-${element.icon}"></span>`,
                text = typeof element.text === 'undefined' ? '' : element.text,
                aLinkElement = `<a href="${element.href}" class="${
                    element.class
                }" title="${element.title}" target="${
                    element.target
                }">${text} ${icon}</a>`,
                linkElement = inline
                    ? aLinkElement
                    : '<p>' + aLinkElement + '</p>';
            $container.append(linkElement);
        });
    };
})(window, (window.UIElements = window.UIElements || {}));
