import {apiBuilder} from '../shared/NodeApi';
import {routes} from '../shared/Routing';

export class SearchService {
    constructor(networkId) {
        this.api = apiBuilder(networkId);
    }

    search = query => {
        if (!query)
            return Promise.resolve();

        query = query.trim();

        return this.api.addresses.validate(query).then(validateResponse => {
            if (validateResponse.data.valid)
                return routes.addresses.one(query);

            return this.api.blocks.heightBySignature(query).then(heightResponse => {
                return routes.blocks.one(heightResponse.data.height);
            }, () => {
                return this.api.transactions.info(query).then(infoResponse => {
                    return routes.transactions.one(infoResponse.data.id);
                })
            });
        });
    };
}
