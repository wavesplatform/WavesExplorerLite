import {routeBuilder} from '../shared/Routing';
import {SearchResult} from '../shared/analytics/Definitions';
import EventBuilder from '../shared/analytics/EventBuilder';
import {ApiClientService} from './ApiClientService';
import {ethAddress2waves} from "@waves/node-api-js";
import {libs} from '@waves/signature-generator';


export class SearchService extends ApiClientService {
    constructor(configurationService, analyticsService, aliasService, networkId) {
        super(configurationService, networkId);

        this.analyticsService = analyticsService;
        this.aliasService = aliasService;
    }

    search = query => {
        if (!query)
            return Promise.resolve();

        query = query.trim();
        const routes = routeBuilder(this.networkId);
        const api = this.getApi();

        if (query.startsWith('0x') && query.length === 42) {

            return api.addresses.wallet().then(addresses => {
                const netId = libs.base58.decode(addresses[0])[1];
                const address = ethAddress2waves(query, netId);
                const event = this.createEvent(SearchResult.address);
                this.analyticsService.sendEvent(event);

                return routes.addresses.one(address);
            }).catch(e => {
                const event = this.createEvent(SearchResult.unknown);
                this.analyticsService.sendEvent(event);

                throw e;
            });
        } else if (/^\d+$/.test(query)) {
            return api.blocks.at(query).then(heightResponse => {
                const event = this.createEvent(SearchResult.block);
                this.analyticsService.sendEvent(event);

                return routes.blocks.one(heightResponse.height);
            }).catch(e => {
                const event = this.createEvent(SearchResult.unknown);
                this.analyticsService.sendEvent(event);

                throw e;
            });
        } else

            return api.addresses.validate(query).then(validateResponse => {
                if (validateResponse.valid) {
                    const event = this.createEvent(SearchResult.address);
                    this.analyticsService.sendEvent(event);
                    return routes.addresses.one(query);
                }

                return api.blocks.heightById(query).then(heightResponse => {
                    const event = this.createEvent(SearchResult.block);
                    this.analyticsService.sendEvent(event);

                    return routes.blocks.one(heightResponse.height);
                });
            })
                .catch(() => {
                    return api.transactions.info(query).then(infoResponse => {
                        const event = this.createEvent(SearchResult.transaction);
                        this.analyticsService.sendEvent(event);

                        return routes.transactions.one(infoResponse.id);
                    });
                }).catch(() => {
                    return this.aliasService.loadAddress(query).then(address => {
                        const event = this.createEvent(SearchResult.alias);
                        this.analyticsService.sendEvent(event);

                        return routes.addresses.one(address);
                    });
                }).catch(() => {
                    return api.assets.details(query).then(detail => {
                        const event = this.createEvent(SearchResult.asset);
                        this.analyticsService.sendEvent(event);

                        return routes.assets.one(detail.assetId);
                    })
                })
                .catch(() => {
                    return api.transactions.leaseInfo([query]).then(detail => {
                        const event = this.createEvent(SearchResult.lease);
                        this.analyticsService.sendEvent(event);

                        const lease = detail[0];
                        return routes.leases.one(lease.id);
                    })
                }).catch(e => {
                    const event = this.createEvent(SearchResult.unknown);
                    this.analyticsService.sendEvent(event);

                    throw e;
                });
    };

    createEvent = searchResult => new EventBuilder().search().events().results(searchResult).build();
}
