const ALIAS_PREFIX = 'alias';

export default class Alias {
    constructor(networkCode, alias) {
        this.networkCode = networkCode;
        this.alias = alias;
    }

    static isAlias = candidate => {
        return candidate.trim().search(ALIAS_PREFIX) == 0;
    };

    static fromString = candidate => {
        var parts = candidate.split(':');
        if (parts.length != 3)
            throw new Error('Too few elements in alias: ' + candidate);

        if (parts[0] !== ALIAS_PREFIX)
            throw new Error('Unexpected alias prefix: ' + candidate);

        return new Alias(parts[1], parts[2])
    };

    toString() {
        return ALIAS_PREFIX + ':' + this.networkCode + ':' + this.alias;
    }
}
