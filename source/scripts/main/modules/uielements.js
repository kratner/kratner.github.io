'use strict';

((window, UIElements) => {
    UIElements.cacheElements = () => {
        UIElements.$el = {
            background: {
                video_element: $('#video-background'),
                video_source: $('#video-background > source')
            },
            footer: {
                copyright: $('.copyright')
            },
            link: $('.gtag'),
            linksContainer: $('#links-container')
        };
    };
    UIElements.displayLinks = (links, $el) => {
        $el.html('').append('<div class="link-padding"></div>');
        links.forEach(element => {
            let icon =
                typeof element.icon === 'undefined'
                    ? ''
                    : `<span class="icon-${element.icon}"></span>`;
            $el.find('.link-padding').append(
                `<p><a href="${element.href}" class="${element.class}" title="${
                    element.title
                }" target="${element.target}">${element.text} ${icon}</a></p>`
            );
        });
    };
})(window, (window.UIElements = window.UIElements || {}));
