'use strict';

((window, Actions) => {
    Actions.methods = {
        switchBackgroundVideo: (arr, $el_video, $el_source) => {
            let new_random_item = Math.floor(Math.random() * arr.length);
            $el_source.attr('src', arr[new_random_item].path);
            $el_video.load();
        },
        displayCopyrightYear: $el => {
            $el.html('&copy;' + (() => new Date())().getFullYear());
        },
        parseLinks: querySnapshot => {
            let links = [],
                linksByWeight = [];
            querySnapshot.docs.forEach(doc => {
                links.push(doc.data());
            });
            linksByWeight = links.sort((elA, elB) => {
                if (elA.weight < elB.weight) {
                    return -1;
                }
                if (elA.weight > elB.weight) {
                    return 1;
                }
                return 0;
            });
            return linksByWeight;
        },
        parseVideoSources: querySnapshot => {
            let sources = [];
            querySnapshot.docs.forEach(doc => {
                sources.push(doc.data());
            });
            return sources;
        }
    };
})(window, (window.Actions = window.Actions || {}));
