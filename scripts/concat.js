/*global UIElements, Collections, Controls, Core, Analytics, Events, Actions*/
((window, document) => {
    'use strict';
    let init = () => {
        UIElements.cacheElements();
        Controls.cacheElements();
        Events.bindEvents();

        // randomize video
        Actions.methods.switchBackgroundVideo(
            Collections.paths.video_sources,
            UIElements.$el.background.video_element,
            UIElements.$el.background.video_source
        );

        Actions.methods.displayCopyrightYear(UIElements.$el.footer.copyright);
    };
    $(document).ready(init);
})(window, document);
'use strict';

((window, Actions) => {
    Actions.methods = {
        switchBackgroundVideo: (arr, $el_video, $el_source) => {
            //console.log('switch video');
            let new_random_item = Math.floor(
                // Math.random() * Collections.paths.video_sources.length
                Math.random() * arr.length
            );
            $el_source.attr('src', arr[new_random_item]);
            $el_video.load();
        },
        displayCopyrightYear: $el => {
            $el.html('&copy;' + (() => new Date())().getFullYear());
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
        console.log('trackOutboundLinks method invoked');
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
        video_sources: [
            'img/20181215_154218.mp4',
            'img/20190103_151234.mp4',
            'img/pb_201811221400.mp4',
            'img/pb_201811261530.mp4',
            'img/pb_201811261532.mp4',
            'img/pb-boardwalk-2018-11-26.mp4'
        ]
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
            link: $('.gtag')
        };
    };
})(window, (window.UIElements = window.UIElements || {}));
