'use strict';

((window, document, Controls) => {
	// http://codepen.io/elijahmanor/pen/Igpoe
	// animated hamburger control
    Controls.initializeNavControl = () => {
        $('#nav-toggle').on('click', 'span', (event) => {
            $(event.target).parents('.controls').toggleClass('active');
        });
    };
})(window, document, window.Controls = window.Controls || {});
