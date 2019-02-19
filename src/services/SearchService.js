import {routeBuilder} from '../shared/Routing';
import {SearchResult} from '../shared/analytics/Definitions';
import EventBuilder from '../shared/analytics/EventBuilder';
import {ApiClientService} from './ApiClientService';

export class SearchService extends ApiClientService {
    constructor(configurationService, analyticsService, networkId) {
        super(configurationService, networkId);

        this.analyticsService = analyticsService;
    }

    search = query => {
        if (!query)
            return Promise.resolve();

        query = query.trim();
        const routes = routeBuilder(this.networkId);
        const api = this.getApi();
        return api.addresses.validate(query).then(validateResponse => {
            if (validateResponse.data.valid) {
                const event = this.createEvent(SearchResult.address);
                this.analyticsService.sendEvent(event);

                return routes.addresses.one(query);
            }

            return api.blocks.heightBySignature(query).then(heightResponse => {
                const event = this.createEvent(SearchResult.block);
                this.analyticsService.sendEvent(event);

                return routes.blocks.one(heightResponse.data.height);
            });
        }).catch(() => {
            return api.transactions.info(query).then(infoResponse => {
                const event = this.createEvent(SearchResult.transaction);
                this.analyticsService.sendEvent(event);

                return routes.transactions.one(infoResponse.data.id);
            }).catch(e => {
                const event = this.createEvent(SearchResult.unknown);
                this.analyticsService.sendEvent(event);

                throw e;
            });
        });
    };

    createEvent = searchResult => new EventBuilder().search().events().results(searchResult).build();
}
