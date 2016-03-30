/*global $*/
'use strict';

(function (window, document) {
    'use strict';

    var init = function init() {
        // stored elements
        var $el = {
            footer: {
                copyright: $('.copyright')
            }
        };

        $el.footer.copyright.html('&copy;' + function () {
            return new Date();
        }().getFullYear());
    };
    $(document).ready(init);
})(window, document);
//# sourceMappingURL=wprest.js.map
