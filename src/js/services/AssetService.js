import Currency from '../shared/Currency';
import Money from '../shared/Money';
import DateTime from '../shared/DateTime';
import {ApiClientService} from './ApiClientService';
import {VostokToWavesEnterprise} from '../shared/constants';

export class AssetService extends ApiClientService {
    constructor(configurationService, networkId) {
        super(configurationService, networkId);
    }

    async loadAssetDetails(assetId) {
        const promise = this.getApi().assets.details(assetId).then(detailsResponse => {
            const data = detailsResponse.data;

            // TODO: remove when token is renamed
            if (data.assetId === VostokToWavesEnterprise.id) {
                data.name = VostokToWavesEnterprise.name;
                data.description = VostokToWavesEnterprise.description;
            }

            const currency = Currency.fromIssueTransaction(data);

            const details = {
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
                scriptDetails: data.scripted ? data.scriptDetails : null,
                minSponsoredFee: data.minSponsoredAssetFee ? Money.fromCoins(data.minSponsoredAssetFee, currency) : null,
                originTransactionId: data.originTransactionId
            }

            this.put(details);

            return details;
        })

        return promise;
    }

    async loadAssetsDetails(assetsId) {
        const dataArray = await this.getApi().assets.detailsMultiple(assetsId)
        return dataArray.reduce((acc, data) => {
                const currency = Currency.fromIssueTransaction(data);
                return [...acc, {
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
                    scriptDetails: data.scripted ? data.scriptDetails : null,
                    minSponsoredFee: data.minSponsoredAssetFee ? Money.fromCoins(data.minSponsoredAssetFee, currency) : null,
                    originTransactionId: data.originTransactionId
                }]
            }
            , [])
    }
}

