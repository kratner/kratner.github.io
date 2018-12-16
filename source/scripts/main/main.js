/*global Controls, Core*/
((window, document, Controls) => {
    'use strict';
    let init = () => {
        // Controls.initializeNavControl();

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
                uri: 'http://rats1966.x10host.com/wp-json', // relocate WP REST API to HTTPS server
                root: 'http://www.keithratner.com',
                midpoint: '/wp/v2/pages/',
                json: '/wp-json/wp/v2/',
                pages: 'pages/',
                posts: 'posts/',
                // pageid: '2063',
                // postid: '2079',
                postid: '2'
            },
            model = new Core.Model(),
            /*
            renderPost = (data) => {
                let post = JSON.parse(data),
                    content = post.content.rendered;
                $el.post.content.html(content);
            },
            */
            cacheData = data => {
                let WPRESTAPIDATA = JSON.parse(data);
                window.WPRESTAPIDATA = WPRESTAPIDATA;
            },
            getSplashPageData = () => {
                //let url = api.root + api.json + api.posts + api.postid;
                //let url = api.uri;
                let url = api.uri + api.midpoint + api.postid;
                model
                    .httpRequest(url)
                    .get()
                    //.then(renderPost);
                    .then(cacheData);
            };
        // window.WPRESTAPIDATA = model.httpRequest(WPRESTAPIURL);
        $el.footer.copyright.html(
            '&copy;' + (() => new Date())().getFullYear()
        );
        // *** relocate WP REST API to HTTPS server
        // getSplashPageData(2063);
    };
    $(document).ready(init);
})(window, document, (window.Controls = window.Controls || {}));
