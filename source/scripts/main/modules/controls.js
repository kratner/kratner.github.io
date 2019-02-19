'use strict';

((window, document, Controls) => {
    Controls.cacheElements = () => {
        Controls.$el = {
            bg_video_switch: $('[data-ctl=bgvideoswitch]'),
            authorize_user: $('.active[data-ctl=userauth'),
            open_login_form: $('[data-ctl=loginform'),
            close_login_form: $(
                '.login-form [data-ctl=close]'
            )
        };
    };
})(
    window,
    document,
    (window.Controls = window.Controls || {})
);
