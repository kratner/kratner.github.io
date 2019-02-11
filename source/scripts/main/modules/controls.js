'use strict';

((window, document, Controls) => {
    Controls.cacheElements = () => {
        Controls.$el = {
            bg_video_switch: $('[data-ctl=bgvideoswitch]'),
            user_auth: $('[data-ctl=userauth')
        };
    };
})(window, document, (window.Controls = window.Controls || {}));
