/*global UIElements, Analytics, Actions, Collections, Controls*/
'use strict';

((window, Events) => {
    Events.bindEvents = () => {
        UIElements.$el.link.on('click', evt => {
            Analytics.trackOutboundLink(evt.target.href);
        });
        UIElements.$el.descriptiveLink.on('click', evt => {
            $(evt.target)
                .parent()
                .find('.linkdescription')
                .addClass('reveal');
        });
        UIElements.$el.hideDescription.on('click', evt => {
            $(evt.target)
                .closest('.linkdescription')
                .removeClass('reveal');
        });
        /*
        UIElements.$el.descriptiveLink.on({
            mouseenter: evt => {
                UIElements.$el.linkDescription.css({
                    'max-height': '0px',
                    opacity: 0
                });
                $(evt.target)
                    .closest('li')
                    .find('.linkdescription')
                    .css({
                        'max-height': '800px',
                        opacity: 1
                    });
            }
        });
        UIElements.$el.linkDescription.on('click', evt => {
            $(evt.target).css({
                'max-height': '0px',
                opacity: 0
            });
        });
        */
        Controls.$el.bg_video_switch.on('click', evt => {
            Actions.methods.switchBackgroundVideo(
                Collections.paths.video_sources,
                UIElements.$el.background.video_element,
                UIElements.$el.background.video_source
            );
        });
        Controls.$el.user_auth.on('click', evt => {
            /*
             * TODO: icon-user-check when authenticated
             */
            UIElements.showLoginForm(UIElements.$el.modalUnderlay);
        });
        Controls.$el.close_login_form.on('click', evt => {
            UIElements.closeLoginForm(UIElements.$el.modalUnderlay);
        });
    };
})(window, (window.Events = window.Events || {}));
