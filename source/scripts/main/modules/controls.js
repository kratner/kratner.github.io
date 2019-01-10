'use strict';

((window, document, Controls) => {
    Controls.cacheElements = () => {
        Controls.$el = {bg_video_switch: $('[data-ctl=bgvideoswitch]')};
    };
})(window, document, (window.Controls = window.Controls || {}));
