'use strict';

/*global UIElements, Collections, Controls, Core, Analytics, Events, Actions*/
(function (window, document) {
    'use strict';

    var init = function init() {
        UIElements.cacheElements();
        Controls.cacheElements();
        Events.bindEvents();

        // randomize video
        Actions.methods.switchBackgroundVideo(Collections.paths.video_sources, UIElements.$el.background.video_element, UIElements.$el.background.video_source);

        Actions.methods.displayCopyrightYear(UIElements.$el.footer.copyright);
    };
    $(document).ready(init);
})(window, document);
/*global gtag*/
'use strict';

(function (window, Actions) {
    Actions.methods = {
        switchBackgroundVideo: function switchBackgroundVideo(arr, $el_video, $el_source) {
            //console.log('switch video');
            var new_random_item = Math.floor(
            // Math.random() * Collections.paths.video_sources.length
            Math.random() * arr.length);
            $el_source.attr('src', arr[new_random_item]);
            $el_video.load();
        },
        displayCopyrightYear: function displayCopyrightYear($el) {
            $el.html('&copy;' + function () {
                return new Date();
            }().getFullYear());
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
        console.log('trackOutboundLinks method invoked');
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
        video_sources: ['img/20181215_154218.mp4', 'img/20190103_151234.mp4', 'img/pb_201811221400.mp4', 'img/pb_201811261530.mp4', 'img/pb_201811261532.mp4', 'img/pb-boardwalk-2018-11-26.mp4']
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
            link: $('.gtag')
        };
    };
})(window, window.UIElements = window.UIElements || {});
