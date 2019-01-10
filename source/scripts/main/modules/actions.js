/*global gtag*/
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
