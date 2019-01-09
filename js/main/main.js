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
/*global Controls, Core, gtag*/
(function (window, document, Controls, UIElements, Collections) {
    'use strict';

    var init = function init() {
        // Controls.initializeNavControl();

        /**
         * Function that tracks a click on an outbound link in Analytics.
         * This function takes a valid URL string as an argument, and uses that URL string
         * as the event label. Setting the transport method to 'beacon' lets the hit be sent
         * using 'navigator.sendBeacon' in browser that support it.
         */
        var trackOutboundLink = function trackOutboundLink(url) {
            gtag('event', 'click', {
                event_category: 'outbound',
                event_label: url,
                transport_type: 'beacon',
                event_callback: function event_callback() {
                    // document.location = url;
                }
            });
        },
            switchBackgroundVideo = function switchBackgroundVideo() {
            //console.log('switch video');
            var new_random_item = Math.floor(Math.random() * Collections.paths.video_sources.length);
            UIElements.$el.background.video_source.attr('src', Collections.paths.video_sources[new_random_item]);
            UIElements.$el.background.video_element.load();
        };
        Collections.paths = {
            video_sources: ['img/20181215_154218.mp4', 'img/20190103_151234.mp4', 'img/pb_201811221400.mp4', 'img/pb_201811261530.mp4', 'img/pb_201811261532.mp4', 'img/pb-boardwalk-2018-11-26.mp4']
        };
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
        Controls.$el = Controls.$el || {};
        Controls.$el.bg_video_switch = $('[data-ctl=bgvideoswitch]');

        UIElements.$el.footer.copyright.html('&copy;' + function () {
            return new Date();
        }().getFullYear());
        UIElements.$el.link.on('click', function (evt) {
            trackOutboundLink(evt.target.href);
        });
        Controls.$el.bg_video_switch.on('click', function (evt) {
            switchBackgroundVideo();
        });
        // randomize video
        switchBackgroundVideo();
        // *** relocate WP REST API to HTTPS server
        // getSplashPageData(2063);
    };
    $(document).ready(init);
})(window, document, window.Controls = window.Controls || {}, window.UIElements = window.UIElements || {}, window.Collections = window.Collections || {});
'use strict';

(function (window, document, Controls) {
    // http://codepen.io/elijahmanor/pen/Igpoe
    // animated hamburger control
    Controls.initializeNavControl = function () {
        var $el = {
            controls: $('.controls'),
            splash: $('.splash'),
            navToggle: $('.nav-toggle'),
            nav: {
                top: $('.controls .site-brand ul')
            }
        };
        $el.navToggle.on('click', function () {
            $el.controls.toggleClass('active');
            $el.splash.toggleClass('active');
            // if ($el.nav.top.hasClass('active')) {
            //     $el.nav.top.removeClass('active').addClass('inactive');
            // } else {
            //     $el.nav.top.addClass('active').removeClass('inactive');
            // }
        });
        $(document).on('keyup', function (evt) {
            if (evt.keyCode === 27) {
                if ($el.controls.hasClass('active')) {
                    $el.controls.toggleClass('active');
                    $el.splash.toggleClass('active');
                }
            }
        });
    };
})(window, document, window.Controls = window.Controls || {});
