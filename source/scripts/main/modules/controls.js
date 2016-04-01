'use strict';

((window, document, Controls) => {
	// http://codepen.io/elijahmanor/pen/Igpoe
	// animated hamburger control
    Controls.initializeNavControl = () => {
        let $el = {
            controls: $('.controls'),
            splash: $('.splash')
        };
        $('#nav-toggle').on('click', () => {
            $el.controls.toggleClass('active');
            $el.splash.toggleClass('active');
        });
    };
})(window, document, window.Controls = window.Controls || {});
