'use strict';

((window, Templates) => {
    /*
     * _ALinkElement
     * param obj = {
     *   href:      hypertext reference
     *   cssClass:  css class(es); separate multiple classes by spaces
     *   title:     title attribute
     *   target:    target attribute
     *   text:      link text
     * }
     */
    Templates._ALinkElement = obj => {
        let dataDescription =
                obj.dataDescription === '' ||
                typeof obj.dataDescription === 'undefined'
                    ? ''
                    : `data-description="${obj.dataDescription}"`,
            descriptiveLinkCSSClass =
                obj.dataDescription === '' ? '' : 'descriptive',
            href = obj.href === '' ? '' : `href="${obj.href}"`;
        return `<a 
            ${href}
            class="${obj.cssClass} ${descriptiveLinkCSSClass}"
            ${dataDescription}
            title="${obj.title}" 
            target="${obj.target}"
        >${obj.text}</a>`;
    };
    Templates._IconElement = icon => `<span class="icon-${icon}"></span>`;
    Templates._PaddedDiv = cssClass => `<div class="${cssClass}"></div>`;
    Templates._ProgressBar = indeterminate => {
        return indeterminate
            ? `<div class="mdprogressbar">
        <div class="line"></div>
        <div class="subline inc"></div>
        <div class="subline dec"></div>
        </div>`
            : '';
    };
})(window, (window.Templates = window.Templates || {}));
