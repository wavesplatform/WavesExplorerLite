import {ApiClientService} from './ApiClientService';
import Money from '../shared/Money';
import Currency from '../shared/Currency';

export class LeaseService extends ApiClientService {

    loadLease = (id) => {
        return this.loadRawLease(id).then(leases => {
            return {
                ...leases[0],
                amount: Money.fromCoins(leases[0].amount, Currency.WAVES)
            }
        });
    };

    loadRawLease = (id) => {
        return this.getApi().transactions.leaseInfo([id]);
    };
}
