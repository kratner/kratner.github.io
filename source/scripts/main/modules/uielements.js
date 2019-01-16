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
            linksContainer: $('#links-container'),
            socialLinksContainer: $('#social-links-container')
        };
    };
    UIElements.showProgressBar = ($container, indeterminate = true) => {
        if (indeterminate) {
            $container.html('').append(`<div class="mdprogressbar">
                <div class="line"></div>
                <div class="subline inc"></div>
                <div class="subline dec"></div>
                </div>`);
        }
    };
    UIElements.displayLinks = (
        links,
        $el,
        hasPadding = true,
        inline = false
    ) => {
        let $container;
        if (hasPadding) {
            $el.html('').append('<div class="link-padding"></div>');
            $container = hasPadding ? $el.find('.link-padding') : $el;
            if (inline) {
                $container.append('<p>');
                $container = $container.find('p');
            }
        } else {
            $container = $el;
            if (inline) {
                $container.html('').append('<p>');
                $container = $container.find('p');
            }
        }
        links.forEach(element => {
            let icon =
                    typeof element.icon === 'undefined'
                        ? ''
                        : `<span class="icon-${element.icon}"></span>`,
                text = typeof element.text === 'undefined' ? '' : element.text,
                aLinkElement = `<a href="${element.href}" class="${
                    element.class
                }" title="${element.title}" target="${
                    element.target
                }">${text} ${icon}</a>`,
                linkElement = inline
                    ? aLinkElement
                    : '<p>' + aLinkElement + '</p>';
            $container.append(linkElement);
        });
    };
})(window, (window.UIElements = window.UIElements || {}));
