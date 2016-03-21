'use strict';
(function(window, document) {
    var f_two = (e) => {
        console.log('second function defined');
    };
    $(document).ready(f_two);
})(window, document);
