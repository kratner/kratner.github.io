/*global $*/
'use strict';
((window, document) => {
    let init = () => {
        // stored elements
        let $el = {
            footer: {
                copyright: $('.copyright')
            }
        };

        $el.footer.copyright.html('&copy;' + (() => new Date())().getFullYear());
    };
    $(document).ready(init);
})(window, document);
