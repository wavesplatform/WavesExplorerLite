import amplitude from 'amplitude-js';

export class AmplitudeAnalyticsService {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    initialize() {
        amplitude.getInstance().init(this.apiKey);
    }

    sendEvent(event) {
        let properties = {
            category: event.categoryName
        };

        if (event.properties) {
            properties = Object.assign({}, event.properties, properties);
        }

        amplitude.getInstance().logEvent(event.eventName, properties);
    }
}
