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
                                uri +=
                                    encodeURIComponent(key) +
                                    '=' +
                                    encodeURIComponent(args[key]);
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
                get: args => ajax('GET', url, args),
                post: args => ajax('POST', url, args),
                put: args => ajax('PUT', url, args),
                // 'delete': function _delete(args) {
                delete: args => ajax('DELETE', url, args)
            };
        };
        return model;
    };
})(window, document, (window.Core = window.Core || {}));
/*global Controls, Core*/
((window, document, Controls) => {
  'use strict';
  let init = () => {
    // Controls.initializeNavControl();

    /**
     * Function that tracks a click on an outbound link in Analytics.
     * This function takes a valid URL string as an argument, and uses that URL string
     * as the event label. Setting the transport method to 'beacon' lets the hit be sent
     * using 'navigator.sendBeacon' in browser that support it.
     */
    let trackOutboundLink = url => {
      gtag('event', 'click', {
        event_category: 'outbound',
        event_label: url,
        transport_type: 'beacon',
        event_callback: () => {
          // document.location = url;
        }
      });
    };

    let $el = {
        footer: {
          copyright: $('.copyright')
        },
        post: {
          content: $('.post-content')
        },
        nav: {
          top: $('.controls .site-brand ul')
        },
        link: $('.gtag')
      },
      api = {
        uri: 'http://rats1966.x10host.com/wp-json', // relocate WP REST API to HTTPS server
        root: 'http://www.keithratner.com',
        midpoint: '/wp/v2/pages/',
        json: '/wp-json/wp/v2/',
        pages: 'pages/',
        posts: 'posts/',
        // pageid: '2063',
        // postid: '2079',
        postid: '2'
      },
      model = new Core.Model(),
      /*
            renderPost = (data) => {
                let post = JSON.parse(data),
                    content = post.content.rendered;
                $el.post.content.html(content);
            },
            */
      cacheData = data => {
        let WPRESTAPIDATA = JSON.parse(data);
        window.WPRESTAPIDATA = WPRESTAPIDATA;
      },
      getSplashPageData = () => {
        //let url = api.root + api.json + api.posts + api.postid;
        //let url = api.uri;
        let url = api.uri + api.midpoint + api.postid;
        model
          .httpRequest(url)
          .get()
          //.then(renderPost);
          .then(cacheData);
      };
    // window.WPRESTAPIDATA = model.httpRequest(WPRESTAPIURL);
    $el.footer.copyright.html('&copy;' + (() => new Date())().getFullYear());
    $el.link.on('click', evt => {
      trackOutboundLink(evt.target.href);
    });
    // *** relocate WP REST API to HTTPS server
    // getSplashPageData(2063);
  };
  $(document).ready(init);
})(window, document, (window.Controls = window.Controls || {}));
'use strict';

((window, document, Controls) => {
    // http://codepen.io/elijahmanor/pen/Igpoe
    // animated hamburger control
    Controls.initializeNavControl = () => {
        let $el = {
            controls: $('.controls'),
            splash: $('.splash'),
            navToggle: $('.nav-toggle'),
            nav: {
                top: $('.controls .site-brand ul')
            }
        };
        $el.navToggle.on('click', () => {
            $el.controls.toggleClass('active');
            $el.splash.toggleClass('active');
            // if ($el.nav.top.hasClass('active')) {
            //     $el.nav.top.removeClass('active').addClass('inactive');
            // } else {
            //     $el.nav.top.addClass('active').removeClass('inactive');
            // }
        });
        $(document).on('keyup', evt => {
            if (evt.keyCode === 27) {
                if ($el.controls.hasClass('active')) {
                    $el.controls.toggleClass('active');
                    $el.splash.toggleClass('active');
                }
            }
        });
    };
})(window, document, (window.Controls = window.Controls || {}));
