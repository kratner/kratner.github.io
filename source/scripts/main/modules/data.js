/*global firebase */
'use strict';

((window, document, Data) => {
    Data.initializeFirebase = () => {
        // Initialize Firebase
        let config = {
            apiKey: 'AIzaSyBErwJPIqN7K-gfcUMisC594dZEHcjnzkY',
            authDomain: 'kratner-firebase.firebaseapp.com',
            databaseURL: 'https://kratner-firebase.firebaseio.com',
            projectId: 'kratner-firebase',
            storageBucket: '',
            messagingSenderId: '386299743486'
        };
        firebase.initializeApp(config);
        Data.database = firebase.database();
    };
    Data.getLinks = () => {
        let linksRef = Data.database.ref('links');
        linksRef.orderByKey().on(
            'value',
            snapshot => {
                console.log(snapshot.val());
            },
            error => {
                console.log('Error: ' + error.code);
            }
        );
    };
})(window, document, (window.Data = window.Data || {}));
