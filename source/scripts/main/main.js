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
                pageid: '2063'
            },
            renderPost = (post) => {
                let content = post.content.rendered;
                $el.post.content.html(content);
            },
            getPageById = id => {
                let url = api.root + '/wp-json/wp/v2/pages/' + api.pageid;
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
