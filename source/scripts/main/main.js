/*global Controls, Core*/
'use strict';
((window, document, Controls) => {
    let init = () => {
        Controls.initializeNavControl();
        let $el = {
                footer: {
                    copyright: $('.copyright')
                },
                post: {
                    content: $('.post-content')
                },
                nav: {
                    top: $('.controls .site-brand ul')
                }
            },
            api = {
                uri: 'http://www.keithratner.com/?wpapi=get_posts&dev=1&id=2063',
                root: 'http://www.keithratner.com',
                json: '/wp-json/wp/v2/',
                pages: 'pages/',
                posts: 'posts/',
                pageid: '2063',
                postid: '2079'
            },
            model = new Core.Model(),
            renderPost = (data) => {
                let post = JSON.parse(data),
                    content = post.content.rendered;
                $el.post.content.html(content);
            },
            getPageById = id => {
                let url = api.root + api.json + api.posts + api.postid;
                model.httpRequest(url)
                    .get()
                    .then(renderPost);
            };
        $el.footer.copyright.html('&copy;' + (() => new Date())().getFullYear());
        getPageById(2063);
    };
    $(document).ready(init);
})(window, document, window.Controls = window.Controls || {});
