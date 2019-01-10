/*global gtag*/
'use strict';

((window, Analytics) => {
    /**
     * Function that tracks a click on an outbound link in Analytics.
     * This function takes a valid URL string as an argument, and uses that URL string
     * as the event label. Setting the transport method to 'beacon' lets the hit be sent
     * using 'navigator.sendBeacon' in browser that support it.
     */
    Analytics.trackOutboundLink = url => {
        console.log('trackOutboundLinks method invoked');
        gtag('event', 'click', {
            event_category: 'outbound',
            event_label: url,
            transport_type: 'beacon',
            event_callback: () => {
                // document.location = url;
            }
        });
    };
})(window, (window.Analytics = window.Analytics || {}));
