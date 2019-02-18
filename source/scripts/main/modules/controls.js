'use strict';

((window, document, Controls) => {
    Controls.cacheElements = () => {
        Controls.$el = {
            bg_video_switch: $('[data-ctl=bgvideoswitch]'),
            user_auth: $('[data-ctl=userauth'),
            close_login_form: $('.login-form [data-ctl=close]')
        };
    };
})(window, document, (window.Controls = window.Controls || {}));
