/*global Router, Data, UIElements, Collections, Controls, Core, Analytics, Events, Actions*/
((window, document) => {
    'use strict';
    let init = () => {
        Router.route();
        Data.initializeFirebase();

        UIElements.cacheElements();
        Controls.cacheElements();
        Events.bindEvents();

        //UIElements.showSpinner(UIElements.$el.spinner);
        UIElements.showSpinner(UIElements.$el.linksContainer);
        //UIElements.showProgressBar(UIElements.$el.linksContainer);
        //UIElements.showProgressBar(UIElements.$el.socialLinksContainer);

        Data.getVideoSources()
            .then(Actions.methods.parseVideoSources)
            .catch(error => {
                console.log('Error getting video source array: ', error);
            })
            .then(sources => {
                Collections.paths.video_sources = sources;
                // randomize video
                /*

                Actions.methods.switchBackgroundVideo(
                    Collections.paths.video_sources,
                    UIElements.$el.background.video_element,
                    UIElements.$el.background.video_source
                );
                */
            });

        Actions.methods.displayCopyrightYear(UIElements.$el.footer.copyright);

        Data.getLinks()
            .then(Actions.methods.parseLinks)
            .catch(error => {
                console.log('Error getting links array: ', error);
            })
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
                UIElements.cacheElements();
                Events.bindEvents();
            });
    };
    $(document).ready(init);
})(window, document);
