'use strict';

(function (window, document, Core) {
    Core.Model = function () {
        var model = {},
            ajax = function ajax(method, url, args) {
            // private function for ajax call

            // Creating a promise
            var promise = new Promise(function (resolve, reject) {
                // Instantiates the XMLHttpRequest
                var client = new XMLHttpRequest(),
                    uri = url,
                    argcount = 0,
                    key = void 0;
                //key = undefined;

                if (args && (method === 'POST' || method === 'PUT')) {
                    uri += '?';
                    for (key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (argcount++) {
                                uri += '&';
                            }
                            uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                        }
                    }
                }

                client.open(method, uri);
                client.send();

                client.onload = function () {
                    if (client.status >= 200 && client.status < 300) {
                        // Performs the function "resolve" when this.status is equal to 2xx
                        resolve(client.response);
                    } else {
                        // Performs the function "reject" when this.status is different than 2xx
                        reject(client.statusText);
                    }
                };
                client.onerror = function () {
                    reject(client.statusText);
                };
            });

            // Return the promise
            return promise;
        };
        model.httpRequest = function (url) {
            return {
                'get': function get(args) {
                    return ajax('GET', url, args);
                },
                'post': function post(args) {
                    return ajax('POST', url, args);
                },
                'put': function put(args) {
                    return ajax('PUT', url, args);
                },
                // 'delete': function _delete(args) {
                'delete': function _delete(args) {
                    return ajax('DELETE', url, args);
                }
            };
        };
        return model;
    };
})(window, document, window.Core = window.Core || {});
/*global Controls, Core*/
'use strict';
(function (window, document, WPREST) {
    var model = new Core.Model(),
        init = function init() {
        WPREST.$el = {
            pages: {
                about: $('.pages__page__about')
            }
        };
    };
    WPREST.api = {
        uri: 'http://www.keithratner.com/?wpapi=get_posts&dev=1&id=2063',
        root: 'http://www.keithratner.com',
        json: '/wp-json/wp/v2/',
        pages: 'pages/',
        posts: 'posts/'
    };
    WPREST.content = {
        pages: {
            about: '2087'
        },
        posts: {
            brief: '2063',
            splash: '2079'
        }
    };
    WPREST.renderPost = function (data) {
        var post = JSON.parse(data),
            content = post.content.rendered;
        WPREST.$el.pages.about.html(content);
    };
    WPREST.getPageById = function (id, callback) {
        var api = WPREST.api,
            url = api.root + api.json + api.pages + id;
        model.httpRequest(url).get().then(callback);
    };
    WPREST.init = function () {
        init();
        WPREST.getPageById(WPREST.content.pages.about, WPREST.renderPost);
    };
    $(document).ready(WPREST.init);
})(window, document, window.WPREST = window.WPREST || {});

/*global $*/
'use strict';
(function (window, document) {
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
