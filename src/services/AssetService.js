import Currency from '../shared/Currency';
import Money from '../shared/Money';
import DateTime from '../shared/DateTime';
import {ApiClientService} from './ApiClientService';

export class AssetService extends ApiClientService {
    constructor(configurationService, networkId) {
        super(configurationService, networkId);
    }

    loadDetails = (assetId) => {
        return this.getApi().assets.details(assetId, true).then(detailsResponse => {
            const data = detailsResponse.data;
            const currency = Currency.fromIssueTransaction(data);

            return {
                id: data.assetId,
                issued: {
                    height: data.issueHeight,
                    timestamp: new DateTime(data.issueTimestamp)
                },
                issuer: data.issuer,
                name: data.name,
                description: data.description,
                decimals: data.decimals,
                reissuable: data.reissuable,
                quantity: Money.fromCoins(data.quantity, currency),
                scripted: data.scripted,
                minSponsoredFee: data.minSponsoredAssetFee ? Money.fromCoins(data.minSponsoredAssetFee, currency) : null
            }
        })
    }
}
