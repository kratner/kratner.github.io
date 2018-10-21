/*global Controls, Core*/
((window, document, Controls) => {
    'use strict';
    let init = () => {
        Controls.initializeNavControl();
        let $el = {
                footer: {
                    copyright: $('.copyright')
                },
                post: {
                    content: $('.post-content')
                },
                nav: {
                    top: $('.controls .site-brand ul')
                }
            },
            model = new Core.Model();
        $el.footer.copyright.html('&copy;' + (() => new Date())().getFullYear());
    };
    $(document).ready(init);
})(window, document, window.Controls = window.Controls || {});
