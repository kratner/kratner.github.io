'use strict';

((window, Templates) => {
    Templates._ALinkElement = (href, cssClass, title, target, text) => {
        return `<a href="${href}" class="${cssClass}" title="${title}" target="${target}">${text}</a>`;
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
