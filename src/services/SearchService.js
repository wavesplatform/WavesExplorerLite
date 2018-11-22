import {apiBuilder} from '../shared/NodeApi';
import {routeBuilder} from '../shared/Routing';

export class SearchService {
    constructor(networkId) {
        this.api = apiBuilder(networkId);
        this.route = routeBuilder(networkId);
    }

    search = query => {
        if (!query)
            return Promise.resolve();

        query = query.trim();

        return this.api.addresses.validate(query).then(validateResponse => {
            if (validateResponse.data.valid)
                return this.route.addresses.one(query);

            return this.api.blocks.heightBySignature(query).then(heightResponse => {
                return this.route.blocks.one(heightResponse.data.height);
            }, () => {
                return this.api.transactions.info(query).then(infoResponse => {
                    return this.route.transactions.one(infoResponse.data.id);
                })
            });
        });
    };
}
