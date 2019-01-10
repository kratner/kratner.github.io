/*global Controls, Core, gtag*/
((window, document, Controls, UIElements, Collections) => {
    'use strict';
    let init = () => {
        // Controls.initializeNavControl();

        /**
         * Function that tracks a click on an outbound link in Analytics.
         * This function takes a valid URL string as an argument, and uses that URL string
         * as the event label. Setting the transport method to 'beacon' lets the hit be sent
         * using 'navigator.sendBeacon' in browser that support it.
         */
        let trackOutboundLink = url => {
                gtag('event', 'click', {
                    event_category: 'outbound',
                    event_label: url,
                    transport_type: 'beacon',
                    event_callback: () => {
                        // document.location = url;
                    }
                });
            },
            switchBackgroundVideo = (arr, $el_video, $el_source) => {
                //console.log('switch video');
                let new_random_item = Math.floor(
                    // Math.random() * Collections.paths.video_sources.length
                    Math.random() * arr.length
                );
                $el_source.attr('src', arr[new_random_item]);
                $el_video.load();
            };
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

        UIElements.$el.footer.copyright.html(
            '&copy;' + (() => new Date())().getFullYear()
        );
        UIElements.$el.link.on('click', evt => {
            trackOutboundLink(evt.target.href);
        });
        Controls.$el.bg_video_switch.on('click', evt => {
            switchBackgroundVideo(
                Collections.paths.video_sources,
                UIElements.$el.background.video_element,
                UIElements.$el.background.video_source
            );
        });
        // randomize video
        switchBackgroundVideo(
            Collections.paths.video_sources,
            UIElements.$el.background.video_element,
            UIElements.$el.background.video_source
        );
        // *** relocate WP REST API to HTTPS server
        // getSplashPageData(2063);
    };
    $(document).ready(init);
})(
    window,
    document,
    (window.Controls = window.Controls || {}),
    (window.UIElements = window.UIElements || {}),
    (window.Collections = window.Collections || {})
);
