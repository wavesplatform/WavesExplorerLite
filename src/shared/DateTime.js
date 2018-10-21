const DEFAULT_LOCALE = 'ru-Ru';

export default class DateTime {
    instant;
    date;
    time;

    constructor(timestamp) {
        this.instant = new Date(timestamp);
        this.date = this.instant.toLocaleDateString(DEFAULT_LOCALE);
        this.time = this.instant.toLocaleTimeString(DEFAULT_LOCALE);
    }
}
