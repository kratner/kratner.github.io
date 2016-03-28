/*global $*/
'use strict';
(function(window, document) {
    'use strict';
    let init = () => {
        // stored elements
        let $el = {
            footer: {
                copyright: $('.copyright')
            }
        };
        $el.footer.copyright.html('&copy;' + (function(){return new Date();})().getFullYear());
    };
    $(document).ready(init);
})(window, document);
