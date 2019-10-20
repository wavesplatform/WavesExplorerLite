const DEFAULT_LOCALE = 'ru-Ru';

export default class DateTime {
    instant;

    constructor(timestamp) {
        this.instant = new Date(timestamp);
    }

    toString() {
        return this.instant.toLocaleString(DEFAULT_LOCALE);
    }

    toUtcString() {
        return this.instant.toLocaleString(DEFAULT_LOCALE, { timeZone: 'UTC' });
    }
}
