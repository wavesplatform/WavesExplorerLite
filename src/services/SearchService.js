import {api} from '../shared/NodeApi';
import {routes} from '../shared/Routing';

export class SearchService {
    search = query => {
        if (!query)
            return Promise.resolve();

        query = query.trim();

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
