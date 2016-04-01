'use strict';

(function (window, document) {
    var init = function init() {
        //alert('doc test ready');
        // http://keithratner.com/wp-json/posts
        // http://www.keithratner.com/?wpapi=get_posts&dev=1&id=2063
        var api = {
            //dataType: 'jsonp',
            uri: 'http://www.keithratner.com/?wpapi=get_posts&dev=1&id=2063',
            root: 'http://www.keithratner.com',
            pageid: '2063'
        },

        //model = window.Core.Model(),
        renderPost = function renderPost(post) {
            console.log(post);
        },
            getPageById = function getPageById(id) {
            var url = api.root + '/wp-json/wp/v2/pages/' + api.pageid;
            console.log(url);
            $.ajax({
                crossDomain: true,
                type: 'GET',
                //headers: {'Access-Control-Allow-Origin': '*'},
                //jsonpCallback: 'jsonhandler',
                //contentType: 'application/json; charset=utf-8',
                async: false,
                //jsonp: 'callback',
                //url: api.root + '?wpapi=get_posts&dev=1&id=' + id,
                url: url,
                dataType: 'json'
                // jsonp: 'jsonp'
                // success: function(data) {
                //     console.log(data);
                // }
            }).then(function (post, textStatus, jqXHR) {
                renderPost(post);
            });
        };
        getPageById(2063);
    };
    $(document).ready(init);
})(window, document);
//# sourceMappingURL=main.js.map
