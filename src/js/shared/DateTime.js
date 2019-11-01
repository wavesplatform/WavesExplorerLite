const DEFAULT_LOCALE = 'ru-Ru';

export default class DateTime {
    instant;

    constructor(timestamp) {
        this.instant = new Date(timestamp);
        this.date = this.instant.toLocaleDateString(DEFAULT_LOCALE);
        this.time = this.instant.toLocaleTimeString(DEFAULT_LOCALE);
    }

    toString() {
        return this.instant.toLocaleString(DEFAULT_LOCALE);
    }

    toUtcString() {
        return this.instant.toLocaleString(DEFAULT_LOCALE, { timeZone: 'UTC' });
    }
}
