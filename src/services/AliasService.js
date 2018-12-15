import {api} from '../shared/NodeApi';

export class AliasService {
    loadAddress = (alias) => {
        return api.aliases.address(alias)
            .then(addressResponse => addressResponse.data.address);
    };
}
