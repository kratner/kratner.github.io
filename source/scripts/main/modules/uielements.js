/*
 * Refer to templates.js module
 * for string literals and information
 */
/*global $, Templates */
'use strict';

((window, UIElements) => {
    UIElements.cacheElements = () => {
        UIElements.$el = {
            body: $('body'),
            background: {
                video_element: $('.video-background__video'),
                video_source: $('.video-background__video > source')
            },
            footer: {
                copyright: $('.copyright')
            },
            link: $('.gtag'),
            linksContainer: $('#links-container'),
            modalUnderlay: $('.modal-underlay'),
            socialLinksContainer: $('#social-links-container'),
            descriptiveLink: $('.descriptive'),
            linkDescription: $('.linkdescription'),
            hideDescription: $('.hidedescription'),
            spinner: $('#spinner')
        };
    };
    UIElements.showProgressBar = ($container, indeterminate = true) => {
        $container.html('').append(Templates._ProgressBar(indeterminate));
    };
    UIElements.showSpinner = ($container, show = true) => {
        let spinner = show ? Templates._IconElement('spinner9') : '';
        $container.html(`<div id="spinner">${spinner}</div>`);
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
                href = '',
                objALinkElement = {
                    dataDescription: dataDescription,
                    target: element.target,
                    title: element.title,
                    text: `${text} ${icon}`
                },
                aLinkElement = '',
                linkElement = '',
                linkDescription = '',
                closeIcon = Templates._IconElement('cancel-circle'),
                closeDescriptionLink = '',
                dataDescriptionLink = '';
            if (linkFromDataDescription) {
                if (dataDescription === '') {
                    href = element.href === '' ? '' : `${element.href}`;
                } else {
                    href = '';
                    dataDescriptionLink =
                        element.href === ''
                            ? ''
                            : Templates._ALinkElement({
                                cssClass: element.class,
                                  //dataDescription: element.description,
                                href: element.href,
                                title: element.title,
                                target: element.target,
                                text: Templates._IconElement('share')
                            });
                }
            } else {
                href = element.href === '' ? '' : `${element.href}`;
            }
            objALinkElement.cssClass = element.class;
            objALinkElement.href = href;
            aLinkElement = Templates._ALinkElement(objALinkElement);
            closeDescriptionLink = `<span class="ctl hidedescription" title="Close">${closeIcon}</span>`;
            linkDescription =
                dataDescription === ''
                    ? ''
                    : `<p class="${dataDescriptionCSSClass}">${closeDescriptionLink} ${dataDescription} ${dataDescriptionLink}</p>`;
            linkElement = `<${htmlListItemTag}>${aLinkElement}${linkDescription}</${htmlListItemTag}>`;
            $container.append(linkElement);
        });
    };
    UIElements.showLoginForm = ($modalUnderlay, modal = true) => {
        $modalUnderlay.addClass('visible');
    };
    UIElements.closeLoginForm = $modalUnderlay => {
        $modalUnderlay.removeClass('visible');
    };
})(window, (window.UIElements = window.UIElements || {}));
