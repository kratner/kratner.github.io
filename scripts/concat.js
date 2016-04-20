'use strict';

((window, document, Core) => {
    Core.Model = () => {
        let model = {},
            ajax = (method, url, args) => {
            // private function for ajax call

            // Creating a promise
                let promise = new Promise((resolve, reject) => {
                // Instantiates the XMLHttpRequest
                    let client = new XMLHttpRequest(),
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

                    client.onload = () => {
                        if (client.status >= 200 && client.status < 300) {
                            // Performs the function "resolve" when this.status is equal to 2xx
                            resolve(client.response);
                        } else {
                            // Performs the function "reject" when this.status is different than 2xx
                            reject(client.statusText);
                        }
                    };
                    client.onerror = () => {
                        reject(client.statusText);
                    };
                });

                // Return the promise
                return promise;
            };
        model.httpRequest = url => {
            return {
                'get': args => ajax('GET', url, args),
                'post': args => ajax('POST', url, args),
                'put': args => ajax('PUT', url, args),
                // 'delete': function _delete(args) {
                'delete': args=> ajax('DELETE', url, args)
            };
        };
        return model;
    };
})(window, document, window.Core = window.Core || {});
/*global Controls, Core*/
'use strict';
((window, document) => {
    let init = () => {
        Controls.initializeNavControl();
        let $el = {
                post: {
                    content: $('.post-content')
                }
            },
            api = {
                uri: 'http://www.keithratner.com/?wpapi=get_posts&dev=1&id=2063',
                root: 'http://www.keithratner.com',
                json: '/wp-json/wp/v2/',
                pages: 'pages/',
                posts: 'posts/',
                pageid: '2063',
                postid: '2079'
            },
            model = new Core.Model(),
            renderPost = (data) => {
                let post = JSON.parse(data),
                    content = post.content.rendered;
                $el.post.content.html(content);
            },
            getPageById = id => {
                let url = api.root + api.json + api.posts + api.postid;
                model.httpRequest(url)
                    .get()
                    .then(renderPost);
            };
        getPageById(2063);
    };
    $(document).ready(init);
})(window, document);
'use strict';

((window, document, Controls) => {
	// http://codepen.io/elijahmanor/pen/Igpoe
	// animated hamburger control
    Controls.initializeNavControl = () => {
        let $el = {
            controls: $('.controls'),
            splash: $('.splash'),
            navToggle: $('.nav-toggle')
        };
        $el.navToggle.on('click', () => {
            $el.controls.toggleClass('active');
            $el.splash.toggleClass('active');
        });
        $(document).on('keyup', (evt) => {
            if (evt.keyCode === 27) {
                if ($el.controls.hasClass('active')) {
                    $el.controls.toggleClass('active');
                    $el.splash.toggleClass('active');
                }
            }
        });
    };
})(window, document, window.Controls = window.Controls || {});
