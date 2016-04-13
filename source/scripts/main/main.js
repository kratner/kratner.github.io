'use strict';
/*global Controls*/
((window, document) => {
    let init = () => {
        Controls.initializeNavControl();
        let $el = {
                post: {
                    content: $('.post-content')
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
            renderPost = (post) => {
                let content = post.content.rendered;
                $el.post.content.html(content);
            },
            getPageById = id => {
                let url = api.root + api.json + api.posts + api.postid;
                $.ajax({
                    crossDomain: true,
                    type: 'GET',
                    //async: false,
                    url: url,
                    dataType: 'json'
                }).then((post, textStatus, jqXHR) => {
                    renderPost(post);
                });
            };
        getPageById(2063);
    };
    $(document).ready(init);
})(window, document);
