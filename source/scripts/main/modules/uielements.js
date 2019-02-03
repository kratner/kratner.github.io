/*
 * Refer to templates.js module
 * for string literals and information
 */
/*global Templates */
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
            socialLinksContainer: $('#social-links-container'),
            descriptiveLink: $('.descriptive'),
            linkDescription: $('.linkdescription')
        };
    };
    UIElements.showProgressBar = ($container, indeterminate = true) => {
        $container.html('').append(Templates._ProgressBar(indeterminate));
    };
    UIElements.displayLinks = (
        links,
        $el,
        hasPadding = true,
        inline = false,
        showDataDescription = true,
        linkFromDataDescription = true,
        dataDescriptionCSSClass = 'linkdescription',
        htmlListTag = 'ul', // stick with unordered list for now
        htmlListItemTag = 'li'
    ) => {
        let $container;
        $el.html('');
        if (hasPadding) {
            let cssPaddingClass = 'link-padding';
            $el.append(Templates._PaddedDiv(cssPaddingClass));
            $container = hasPadding ? $el.find(`.${cssPaddingClass}`) : $el;
        } else {
            $container = $el;
        }
        $container.append($(`<${htmlListTag}>`));
        $container = $container.find(htmlListTag);
        links.forEach(element => {
            let icon =
                    typeof element.icon === 'undefined'
                        ? ''
                        : Templates._IconElement(element.icon),
                text = typeof element.text === 'undefined' ? '' : element.text,
                dataDescription =
                    typeof element.description === 'undefined'
                        ? ''
                        : element.description,
                linkDescription =
                    dataDescription === ''
                        ? ''
                        : `<p class="${dataDescriptionCSSClass}">${dataDescription}</p>`,
                aLinkElement = Templates._ALinkElement({
                    cssClass: element.class,
                    dataDescription: dataDescription,
                    href: element.href,
                    target: element.target,
                    title: element.title,
                    text: `${text} ${icon}`
                }),
                linkElement = `<${htmlListItemTag}>${aLinkElement}${linkDescription}</${htmlListItemTag}>`;
            $container.append(linkElement);
        });
    };
})(window, (window.UIElements = window.UIElements || {}));
