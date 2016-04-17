/*global Controls, Core*/
'use strict';
((window, document, WPREST) => {
    let model = new Core.Model(),
        init = () => {
            WPREST.$el = {
                pages: {
                    about: $('.pages__page__about')
                }
            };
        };
    WPREST.api = {
        uri: 'http://www.keithratner.com/?wpapi=get_posts&dev=1&id=2063',
        root: 'http://www.keithratner.com',
        json: '/wp-json/wp/v2/',
        pages: 'pages/',
        posts: 'posts/'
    };
    WPREST.content = {
        pages: {
            about: '2087'
        },
        posts: {
            brief: '2063',
            splash: '2079'
        }
    };
    WPREST.renderPost = data => {
        let post = JSON.parse(data),
            content = post.content.rendered;
        WPREST.$el.pages.about.html(content);
    };
    WPREST.getPageById = (id, callback) => {
        let api = WPREST.api,
            url = api.root + api.json + api.pages + id;
        model.httpRequest(url)
            .get()
            .then(callback);
    };
    WPREST.init = () => {
        init();
        WPREST.getPageById(WPREST.content.pages.about, WPREST.renderPost);
    };
    $(document).ready(WPREST.init);
})(window, document, window.WPREST = window.WPREST || {});

