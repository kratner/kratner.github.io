'use strict';

/*global Data, UIElements, Collections, Controls, Core, Analytics, Events, Actions*/
(function (window, document) {
    'use strict';

    var init = function init() {
        Data.initializeFirebase();

        UIElements.cacheElements();
        Controls.cacheElements();
        Events.bindEvents();

        UIElements.showProgressBar(UIElements.$el.linksContainer);
        UIElements.showProgressBar(UIElements.$el.socialLinksContainer);

        Data.getVideoSources().then(Actions.methods.parseVideoSources).catch(function (error) {
            console.log('Error getting video source array: ', error);
        }).then(function (sources) {
            Collections.paths.video_sources = sources;
            // randomize video
            Actions.methods.switchBackgroundVideo(Collections.paths.video_sources, UIElements.$el.background.video_element, UIElements.$el.background.video_source);
        });

        Actions.methods.displayCopyrightYear(UIElements.$el.footer.copyright);

        Data.getLinks().then(Actions.methods.parseLinks).catch(function (error) {
            console.log('Error getting links array: ', error);
        }).then(function (links) {
            Collections.links.project_links = links.filter(function (element) {
                return element.type === 'project';
            });
            Collections.links.social_links = links.filter(function (element) {
                return element.type === 'social';
            });
            UIElements.displayLinks(Collections.links.project_links, UIElements.$el.linksContainer);
            UIElements.displayLinks(Collections.links.social_links, UIElements.$el.socialLinksContainer, false, true);
        });
    };
    $(document).ready(init);
})(window, document);
'use strict';

(function (window, Actions) {
    Actions.methods = {
        switchBackgroundVideo: function switchBackgroundVideo(arr, $el_video, $el_source) {
            var new_random_item = Math.floor(Math.random() * arr.length);
            $el_source.attr('src', arr[new_random_item].path);
            $el_video.load();
        },
        displayCopyrightYear: function displayCopyrightYear($el) {
            $el.html('&copy;' + function () {
                return new Date();
            }().getFullYear());
        },
        parseLinks: function parseLinks(querySnapshot) {
            var links = [],
                linksByWeight = [];
            querySnapshot.docs.forEach(function (doc) {
                links.push(doc.data());
            });
            linksByWeight = links.sort(function (elA, elB) {
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
        parseVideoSources: function parseVideoSources(querySnapshot) {
            var sources = [];
            querySnapshot.docs.forEach(function (doc) {
                sources.push(doc.data());
            });
            return sources;
        }
    };
})(window, window.Actions = window.Actions || {});
/*global gtag*/
'use strict';

(function (window, Analytics) {
    /**
     * Function that tracks a click on an outbound link in Analytics.
     * This function takes a valid URL string as an argument, and uses that URL string
     * as the event label. Setting the transport method to 'beacon' lets the hit be sent
     * using 'navigator.sendBeacon' in browser that support it.
     */
    Analytics.trackOutboundLink = function (url) {
        gtag('event', 'click', {
            event_category: 'outbound',
            event_label: url,
            transport_type: 'beacon',
            event_callback: function event_callback() {
                // document.location = url;
            }
        });
    };
})(window, window.Analytics = window.Analytics || {});
'use strict';

(function (window, document, Controls) {
    Controls.cacheElements = function () {
        Controls.$el = { bg_video_switch: $('[data-ctl=bgvideoswitch]') };
    };
})(window, document, window.Controls = window.Controls || {});
'use strict';

(function (window, document, Core) {
    Core.Model = function () {
        var model = {},
            ajax = function ajax(method, url, args) {
            // private function for ajax call

            // Creating a promise
            var promise = new Promise(function (resolve, reject) {
                // Instantiates the XMLHttpRequest
                var client = new XMLHttpRequest(),
                    uri = url,
                    argcount = 0,
                    key = void 0;
                //key = undefined;

                if (args && (method === 'POST' || method === 'PUT')) {
                    uri += '?';
                    for (key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (argcount++) {
                                uri += '&';
                            }
                            uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                        }
                    }
                }

                client.open(method, uri);
                client.send();

                client.onload = function () {
                    if (client.status >= 200 && client.status < 300) {
                        // Performs the function "resolve" when this.status is equal to 2xx
                        resolve(client.response);
                    } else {
                        // Performs the function "reject" when this.status is different than 2xx
                        reject(client.statusText);
                    }
                };
                client.onerror = function () {
                    reject(client.statusText);
                };
            });

            // Return the promise
            return promise;
        };
        model.httpRequest = function (url) {
            return {
                get: function get(args) {
                    return ajax('GET', url, args);
                },
                post: function post(args) {
                    return ajax('POST', url, args);
                },
                put: function put(args) {
                    return ajax('PUT', url, args);
                },
                // 'delete': function _delete(args) {
                delete: function _delete(args) {
                    return ajax('DELETE', url, args);
                }
            };
        };
        return model;
    };
})(window, document, window.Core = window.Core || {});
/*global firebase, Actions */
'use strict';

(function (window, document, Data) {
    Data.initializeFirebase = function () {
        // Initialize Firebase
        var config = {
            apiKey: 'AIzaSyBErwJPIqN7K-gfcUMisC594dZEHcjnzkY',
            authDomain: 'kratner-firebase.firebaseapp.com',
            databaseURL: 'https://kratner-firebase.firebaseio.com',
            projectId: 'kratner-firebase',
            storageBucket: '',
            messagingSenderId: '386299743486'
        };
        firebase.initializeApp(config);
        Data.database = firebase.database();
        var firestore = firebase.firestore(),
            settings = { timestampsInSnapshots: true };
        firestore.settings(settings);
        Data.firestore = firestore;
        Data.getCollection = function (id) {
            return Data.firestore.collection(id).get();
        };
    };
    Data.getLinks = function () {
        return Data.getCollection('links');
    };
    Data.getVideoSources = function () {
        return Data.getCollection('video_sources');
    };
})(window, document, window.Data = window.Data || {});
/*global UIElements, Analytics, Actions, Collections, Controls*/
'use strict';

(function (window, Events) {
    Events.bindEvents = function () {
        UIElements.$el.link.on('click', function (evt) {
            Analytics.trackOutboundLink(evt.target.href);
        });
        Controls.$el.bg_video_switch.on('click', function (evt) {
            Actions.methods.switchBackgroundVideo(Collections.paths.video_sources, UIElements.$el.background.video_element, UIElements.$el.background.video_source);
        });
    };
})(window, window.Events = window.Events || {});
'use strict';

(function (window, Collections) {
    Collections.paths = {
        video_sources: []
    };
    Collections.links = {
        project_links: [],
        social_links: []
    };
})(window, window.Collections = window.Collections || {});
'use strict';

(function (window, UIElements) {
    UIElements.cacheElements = function () {
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
    UIElements.showProgressBar = function ($container) {
        var indeterminate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (indeterminate) {
            $container.html('').append('<div class="mdprogressbar">\n                <div class="line"></div>\n                <div class="subline inc"></div>\n                <div class="subline dec"></div>\n                </div>');
        }
    };
    UIElements.displayLinks = function (links, $el) {
        var hasPadding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var inline = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        var $container = void 0;
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
        links.forEach(function (element) {
            var icon = typeof element.icon === 'undefined' ? '' : '<span class="icon-' + element.icon + '"></span>',
                text = typeof element.text === 'undefined' ? '' : element.text,
                aLinkElement = '<a href="' + element.href + '" class="' + element.class + '" title="' + element.title + '" target="' + element.target + '">' + text + ' ' + icon + '</a>',
                linkElement = inline ? aLinkElement : '<p>' + aLinkElement + '</p>';
            $container.append(linkElement);
        });
    };
})(window, window.UIElements = window.UIElements || {});
