'use strict';
(function(window, document) {
    var f_one = (e) => {
        console.log('first function defined');
    };
    $(document).ready(f_one);
})(window, document);
'use strict';
(function(window, document) {
    var f_three = (e) => {
        console.log('third function defined');
    };
    $(document).ready(f_three);
})(window, document);
'use strict';
(function(window, document) {
    var f_two = (e) => {
        console.log('second function defined');
    };
    $(document).ready(f_two);
})(window, document);
