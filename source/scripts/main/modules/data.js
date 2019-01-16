/*global firebase, Actions */
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
        const firestore = firebase.firestore(),
            settings = {timestampsInSnapshots: true};
        firestore.settings(settings);
        Data.firestore = firestore;
        Data.collection = Data.firestore.collection('links');
    };
    Data.getLinks = () => {
        return Data.collection.get();
    };
})(window, document, (window.Data = window.Data || {}));
