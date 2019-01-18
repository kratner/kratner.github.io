'use strict';

((window, document, Router) => {
    Router.route = () => {
        const ref = document.referrer,
            isValidUrl = string => {
                try {
                    new URL(string);
                    return true;
                } catch (_) {
                    return false;
                }
            },
            url = isValidUrl(ref) ? new URL(ref) : new URL(document.location);
        console.log(url);
    };
})(window, document, (window.Router = window.Router || {}));
