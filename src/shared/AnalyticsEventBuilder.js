const EVENT_DIRECTORY = {
    main: {
        category: 'Main',
        events: {
            show: 'Main Info Show'
        }
    },
    blocks: {
        category: 'Blocks',
        events: {
            show: 'Blocks Show'
        }
    },
    peers: {
        category: 'Peers',
        events: {
            show: 'Peers Show'
        }
    },
    nodes: {
        category: 'Nodes',
        events: {
            show: 'Nodes Show'
        }
    },
    settings: {
        category: 'Settings',
        events: {
            show: 'Settings Show',
            testnetSelected: 'Testnet Selected',
            mainnetSelected: 'Mainnet Selected',
            customNetworkApplied: 'Settings Custom Network Applied'
        }
    },
    search: {
        category: 'Search',
        events: {
            results: 'Search Results'
        }
    }
};

class EventBuilder {
    constructor(categoryBuilder, eventName, properties) {
        this.categoryName = categoryBuilder.categoryName;
        this.eventName = `${this.categoryName} ${eventName}`;
        this.properties = properties;
    }

    build() {
        return {
            eventName: this.eventName,
            categoryName: this.categoryName,
            properties: this.properties
        };
    }
}

class ShowEventBuilder extends EventBuilder {
    constructor(categoryBuilder) {
        super(categoryBuilder, 'Show');
    }
}

class AbstractCategoryBuilder {
    constructor(name) {
        this.categoryName = name;
    }

    events() {
        throw new TypeError('Calling abstract class method');
    };
}

class SimpleCategoryBuilder extends AbstractCategoryBuilder {
    constructor(name) {
        super(name);
    }

    events() {
        return {
            show: () => new ShowEventBuilder(this)
        };
    }
}

class SettingsCategoryBuilder extends AbstractCategoryBuilder {
    constructor() {
        super('Settings');
    }

    events() {
        return {
            show: () => new ShowEventBuilder(this),
            testnetSelected: () => new EventBuilder(this, 'Testnet Selected'),
            mainnetSelected: () => new EventBuilder(this, 'Mainnet Selected'),
            customNetworkApplied: networkId => new EventBuilder(this, 'Custom Network Applied', {
                Network: networkId
            })
        }
    }
}

class SearchCategoryBuilder extends AbstractCategoryBuilder {
    constructor() {
        super('Search');
    }

    events() {
        return {
            results: () => new EventBuilder(this, 'Results')
        }
    }
}

class AnalyticsEventBuilder {
    main() {
        return new SimpleCategoryBuilder('Main');
    }

    blocks() {
        return new SimpleCategoryBuilder('Blocks');
    }

    peers() {
        return new SimpleCategoryBuilder('Peers');
    }

    nodes() {
        return new SimpleCategoryBuilder('Nodes');
    }

    settings() {
        return new SettingsCategoryBuilder();
    }

    search() {
        return new SearchCategoryBuilder();
    }
}

export default AnalyticsEventBuilder;
