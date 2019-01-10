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
