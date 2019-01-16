/*global Data, UIElements, Collections, Controls, Core, Analytics, Events, Actions*/
((window, document) => {
    'use strict';
    let init = () => {
        Data.initializeFirebase();

        UIElements.cacheElements();
        Controls.cacheElements();
        Events.bindEvents();

        UIElements.showProgressBar(UIElements.$el.linksContainer);
        UIElements.showProgressBar(UIElements.$el.socialLinksContainer);

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
                Collections.links.project_links = links.filter(
                    element => element.type === 'project'
                );
                Collections.links.social_links = links.filter(
                    element => element.type === 'social'
                );
                UIElements.displayLinks(
                    Collections.links.project_links,
                    UIElements.$el.linksContainer
                );
                UIElements.displayLinks(
                    Collections.links.social_links,
                    UIElements.$el.socialLinksContainer,
                    false,
                    true
                );
            });
    };
    $(document).ready(init);
})(window, document);
