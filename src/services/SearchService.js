import {routes} from '../shared/Routing';
import {ApiClientService} from './ApiClientService';

export class SearchService extends ApiClientService {
    constructor(configurationService) {
        super(configurationService);
    }
    search = query => {
        if (!query)
            return Promise.resolve();

        query = query.trim();

        const api = this.getApi();
        return api.addresses.validate(query).then(validateResponse => {
            if (validateResponse.data.valid)
                return routes.addresses.one(query);

            return api.blocks.heightBySignature(query).then(heightResponse => {
                return routes.blocks.one(heightResponse.data.height);
            });
        }).catch(() => {
            return api.transactions.info(query).then(infoResponse => {
                return routes.transactions.one(infoResponse.data.id);
            })
        });
    };
}
