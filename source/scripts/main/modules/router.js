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
        switch (url.pathname) {
        case '/admin.html':
            console.log('launch admin login form');
            break;
        default:
            console.log(url.pathname);
        }
        //console.log(url);
    };
})(window, document, (window.Router = window.Router || {}));
