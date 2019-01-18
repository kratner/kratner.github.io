'use strict';

((window, document, Router) => {
    Router.route = () => {
        const ref = document.referrer,
            isValidUrl = string => {
                try {
                    let newUrl = new URL(string);
                    return true;
                } catch (err) {
                    return false;
                }
            },
            url = isValidUrl(ref) ? new URL(ref) : new URL(document.location);
        console.log(url);
    };
})(window, document, (window.Router = window.Router || {}));
