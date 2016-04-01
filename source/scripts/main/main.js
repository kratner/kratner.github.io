'use strict';
/*global Controls*/
((window, document) => {
    let init = () => {
        Controls.initializeNavControl();
        let api = {
                uri: 'http://www.keithratner.com/?wpapi=get_posts&dev=1&id=2063',
                root: 'http://www.keithratner.com',
                pageid: '2063'
            },
            renderPost = (post) => {
                console.log(post);
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
