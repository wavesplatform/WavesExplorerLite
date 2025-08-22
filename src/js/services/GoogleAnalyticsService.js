import ga from 'react-ga4';

export class GoogleAnalyticsService {
    constructor(trackingId) {
        this.trackingId = trackingId;
    }

    initialize() {
        ga.initialize(this.trackingId, {
            titleCase: false,
            // debug: true
        });
    }

    sendEvent(event) {
        ga.event({
            category: event.categoryName,
            action: event.eventName,
            nonInteraction: true
        });
    }
}
