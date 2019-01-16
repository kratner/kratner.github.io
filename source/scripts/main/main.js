/*global Data, UIElements, Collections, Controls, Core, Analytics, Events, Actions*/
((window, document) => {
    'use strict';
    let init = () => {
        Data.initializeFirebase();

        UIElements.cacheElements();
        Controls.cacheElements();
        Events.bindEvents();

        UIElements.showProgressBar(UIElements.$el.linksContainer);

        Data.getVideoSources()
            .then(Actions.methods.parseVideoSources)
            .then(sources => {
                Collections.paths.video_sources = sources;
                // randomize video
                Actions.methods.switchBackgroundVideo(
                    Collections.paths.video_sources,
                    UIElements.$el.background.video_element,
                    UIElements.$el.background.video_source
                );
            });

        Actions.methods.displayCopyrightYear(UIElements.$el.footer.copyright);

        Data.getLinks()
            .then(Actions.methods.parseLinks)
            .then(links => {
                UIElements.displayLinks(links, UIElements.$el.linksContainer);
            });
    };
    $(document).ready(init);
})(window, document);
