import moment from 'moment-timezone';

const DEFAULT_LOCALE = 'ru-Ru';

export default class DateTime {
    instant;
    date;
    time;

    constructor(timestamp) {
        const nativeDate = new Date(timestamp);
        this.instant = moment(nativeDate);
        this.date = nativeDate.toLocaleDateString(DEFAULT_LOCALE);
        this.time = nativeDate.toLocaleTimeString(DEFAULT_LOCALE);
    }

    toString() {
        return this.instant.format('H:mm:ss, DD.MM.YYYY');
    }

    toStringWithTimeZone() {
        const date = this.toString();
        const timeZone = moment.tz.guess();

        if (timeZone) {
            const zone = moment.tz.zone(timeZone).abbr(this.instant.toDate());
            return `${date} ${zone}`;
        }

        return date;
    }
}
