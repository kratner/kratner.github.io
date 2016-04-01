'use strict';

(function (window, document) {
    var init = function init() {
        //alert('doc test ready');
        // http://keithratner.com/wp-json/posts
        // http://www.keithratner.com/?wpapi=get_posts&dev=1&id=2063
        var api = {
            uri: 'http://www.keithratner.com/?wpapi=get_posts&dev=1&id=2063'
        };
        $.ajax({
            url: api.uri
        });
    };
    $(document).ready(init);
})(window, document);
//# sourceMappingURL=main.js.map
