/*global Data, UIElements, Collections, Controls, Core, Analytics, Events, Actions*/
((window, document) => {
    'use strict';
    let init = () => {
        Data.initializeFirebase();

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

        Data.getLinks();
    };
    $(document).ready(init);
})(window, document);
