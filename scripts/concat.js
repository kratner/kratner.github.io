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
                    key;
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
                    if (this.status >= 200 && this.status < 300) {
                        // Performs the function "resolve" when this.status is equal to 2xx
                        resolve(this.response);
                    } else {
                        // Performs the function "reject" when this.status is different than 2xx
                        reject(this.statusText);
                    }
                };
                client.onerror = function () {
                    reject(this.statusText);
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
                'delete': function _delete(args) {
                    return ajax('DELETE', url, args);
                }
            };
        };
        return model;
    };
})(window, document, window.Core = window.Core || {});
//# sourceMappingURL=core.js.map
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
