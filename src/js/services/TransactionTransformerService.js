import Currency from '../shared/Currency';
import Money from '../shared/Money';
import OrderPrice from '../shared/OrderPrice';
import DateTime from '../shared/DateTime';
import {libs} from '@waves/signature-generator';

const transformSingle = async (currencyService, spamDetectionService, stateChangeService, assetService, tx) => {

    const info = (await currencyService.getApi().transactions.status([tx.id]))[0];

    return transform(
        currencyService,
        spamDetectionService,
        stateChangeService,
        assetService,
        {...tx, applicationStatus: info && info.applicationStatus},
        true
    );
};

const transformMultiple = async (currencyService, spamDetectionService, stateChangeService, assetService, transactions) => {
    const transactionsWithAssetDetails = [2, 4, 14]

    const infoMap = (await currencyService.getApi().transactions.status(transactions.map(({id}) => id)))
        .reduce((acc, val) => ({...acc, [val.id]: val}), {});

    const assetsIds = transactions
        .filter(tx => transactionsWithAssetDetails.includes(tx.type))
        .reduce((acc, tx) => {
                return (tx.assetId !== null && tx.assetId !== undefined && !acc.includes(tx.assetId))
                    ? [...acc, tx.assetId]
                    : acc
            }, []
        )

    const assetsDetails = (await assetService.loadDetails(assetsIds))
        .reduce((acc, assetDetail) => ({
            ...acc,
            [assetDetail.assetId]: assetDetail
        }), {});

    const promises = transactions.map(item =>
        transform(currencyService,
            spamDetectionService,
            stateChangeService,
            assetService,
            {
                ...item,
                applicationStatus: infoMap[item.id] && infoMap[item.id].applicationStatus,
                details: transactionsWithAssetDetails.includes(item.type)
                    ? assetsDetails[item.assetId]
                    : undefined
            },
            false
        )
    );

    return Promise.all(promises);
};

const transform = (currencyService, spamDetectionService, stateChangeService, assetService, tx, shouldLoadDetails) => {
    switch (tx.type) {
        case 1:
            return transformGenesis(currencyService, tx);

        case 2:
        case 4:
            return transformTransfer(currencyService, assetService, spamDetectionService, tx);

        case 3:
            return transformIssue(currencyService, tx);

        case 5:
            return transformReissue(currencyService, tx);

        case 6:
            return transformBurn(currencyService, tx);

        case 7:
            return transformExchange(currencyService, tx);

        case 8:
            return transformLease(currencyService, tx);

        case 9:
            return transformLeaseCancel(currencyService, tx);

        case 10:
            return transformAlias(currencyService, tx);

        case 11:
            return transformMassTransfer(currencyService, spamDetectionService, tx);

        case 12:
            return transformData(currencyService, tx);

        case 13:
            return transformScript(currencyService, tx);

        case 14:
            return transformSponsorship(currencyService, assetService, tx);

        case 15:
            return transformAssetScript(currencyService, tx);

        case 16:
            return transformScriptInvocation(currencyService, stateChangeService, assetService, tx, shouldLoadDetails);

        case 17:
            return transformUpdateAssetInfo(currencyService, tx);

        case 18:
            return transformContinuation(currencyService, tx);

        default:
            return Promise.resolve(Object.assign({}, tx));
    }
};

const DEFAULT_FUNCTION_CALL = {
    function: 'default',
    args: []
};

const attachmentToString = (attachment) => {
    if (!attachment) return '';
    if (attachment.value) return attachment.value.toString();
    const bytes = libs.base58.decode(attachment);
    let result = '';
    try {
        result = libs.converters.byteArrayToString(bytes);
    } catch (e) {
        // do nothing
    }

    return result;
};

const copyMandatoryAttributes = tx => {
    let proofs = tx.proofs;

    if (!proofs || proofs.length === 0) {
        proofs = [tx.signature];
    }

    return {
        id: tx.id,
        type: tx.type,
        version: tx.version,
        timestamp: new DateTime(tx.timestamp),
        sender: tx.sender,
        senderPublicKey: tx.senderPublicKey,
        height: tx.height,
        proofs
    };
};

const loadAmountAndFeeCurrencies = (currencyService, amountAssetId, feeAssetId) => {
    return Promise.all([
        currencyService.get(amountAssetId),
        currencyService.get(feeAssetId)
    ]);
};


const transformUpdateAssetInfo = (currencyService, tx) => {
    return currencyService.get(tx.assetId).then(asset => {
        return Object.assign(copyMandatoryAttributes(tx), {
            asset,
            fee: Money.fromCoins(tx.fee, Currency.WAVES),
            timestamp: new DateTime(tx.timestamp),
            assetName: tx.name,
            description: tx.description,
            assetId: tx.assetId,
        })
    });
}

const transformContinuation = (currencyService, tx) => {
    let feeCurrency = Currency.WAVES
    if (!!tx.feeAssetId) currencyService.get(tx.feeAssetId).then(async (currency) => {
        feeCurrency = currency
    })
    else return {
        version: tx.version,
        type: tx.type,
        id: tx.id,
        nonce: tx.nonce,
        invokeScriptTransactionId: tx.invokeScriptTransactionId,
        height: tx.height,
        applicationStatus: tx.applicationStatus,
        fee: Money.fromCoins(tx.fee, feeCurrency),
    }
}

const transformScriptInvocation = (currencyService, stateChangeService, assetService, tx, shouldLoadDetails) => {

    const wavesDetail = {name: "WAVES", assetId: null, decimals: 8, description: "waves"}

    try {
        return currencyService.get(tx.feeAssetId).then(async (feeCurrency) => {
            let payment = [];
            if (tx.payment && tx.payment.length > 0) {
                payment = (await Promise.all(tx.payment.map(async ({amount, assetId}) => {
                    const currency = await currencyService.get(assetId)
                    return Money.fromCoins(amount, currency)
                })))
            }

            const extraFeePerStep = tx.version > 2 ? tx.extraFeePerStep : undefined
            const result = Object.assign(copyMandatoryAttributes(tx), {
                applicationStatus: tx.applicationStatus,
                dappAddress: tx.dApp,
                call: tx.call || DEFAULT_FUNCTION_CALL,
                payment,
                fee: Money.fromCoins(tx.fee, feeCurrency),
                extraFeePerStep: !!extraFeePerStep && Money.fromCoins(extraFeePerStep, feeCurrency),
            });

            const appendAssetData = async (data, assetKey) => {
                const detailsArray = data
                    ? await currencyService.getApi().assets.detailsMultiple(data.map(v => v[assetKey]).filter(v => v != null))
                    : [];
                return data && data.length
                    ? Promise.all(data.map(async (item) => {
                        const {assetId: id, name, decimals, description} = detailsArray
                            .find(({assetId}) => assetId === item[assetKey]) || wavesDetail
                        const currency = id ? new Currency({id, displayName: name, precision: decimals}) : Currency.WAVES;
                        return {
                            ...item,
                            money: Money.fromCoins(item.amount || item.quantity || 0, currency),
                            name,
                            decimals,
                            description
                        }
                    }))
                    : []
            }

            if (!shouldLoadDetails)
                return result;
            const changes = await stateChangeService.loadStateChanges(tx.id)
            if (changes && changes.stateChanges) {
                result.stateChanges = changes.stateChanges;
                result.stateChanges.transfers = await appendAssetData(result.stateChanges.transfers, 'asset')
                result.stateChanges.issues = await appendAssetData(result.stateChanges.issues, 'assetId')
                result.stateChanges.reissues = await appendAssetData(result.stateChanges.reissues, 'assetId')
                result.stateChanges.burns = await appendAssetData(result.stateChanges.burns, 'assetId')
            }
            return result;
        });
    }
    catch (e)
    {
        console.log('error', e)
    }
};


const transformAssetScript = (currencyService, tx) => {
    return currencyService.get(tx.assetId).then(asset => {
        return Object.assign(copyMandatoryAttributes(tx), {
            script: tx.script,
            asset,
            fee: Money.fromCoins(tx.fee, Currency.WAVES)
        })
    });
};

const transformData = (currencyService, tx) => {
    return currencyService.get(tx.feeAssetId).then(feeCurrency => {
        return Object.assign(copyMandatoryAttributes(tx), {
            data: tx.data,
            fee: Money.fromCoins(tx.fee, feeCurrency)
        })
    });
};

const transformScript = (currencyService, tx) => {
    return currencyService.get(tx.feeAssetId).then(feeCurrency => {
        return Object.assign(copyMandatoryAttributes(tx), {
            script: tx.script,
            fee: Money.fromCoins(tx.fee, feeCurrency)
        })
    });
};

const transformSponsorship = async (currencyService, assetService, tx) => {
    const pair = await loadAmountAndFeeCurrencies(currencyService, tx.assetId, tx.feeAssetId)
    const sponsoredCurrency = pair[0];
    const feeCurrency = pair[1];

    const sponsoredFee = tx.minSponsoredAssetFee ?
        Money.fromCoins(tx.minSponsoredAssetFee, sponsoredCurrency) :
        null;

    return Object.assign(copyMandatoryAttributes(tx), {
        fee: Money.fromCoins(tx.fee, feeCurrency),
        sponsoredFee
    });
};

const transformMassTransfer = (currencyService, spamDetectionService, tx) => {
    return loadAmountAndFeeCurrencies(currencyService, tx.assetId, tx.feeAssetId).then(pair => {
        const amountCurrency = pair[0];
        const feeCurrency = pair[1];

        const transfers = tx.transfers.map(item => ({
            recipient: item.recipient,
            amount: Money.fromCoins(item.amount, amountCurrency)
        }));

        return Object.assign(copyMandatoryAttributes(tx), {
            fee: Money.fromCoins(tx.fee, feeCurrency),
            attachment: attachmentToString(tx.attachment),
            totalAmount: Money.fromCoins(tx.totalAmount, amountCurrency),
            transferCount: tx.transferCount,
            isSpam: spamDetectionService.isSpam(tx.assetId),
            transfers
        });
    });
};

const transformAlias = (currencyService, tx) => {
    return Promise.resolve(
        Object.assign(copyMandatoryAttributes(tx), {
            fee: Money.fromCoins(tx.fee, Currency.WAVES),
            alias: tx.alias
        })
    );
};

const transformLease = (currencyService, tx) => {
    return currencyService.get(tx.feeAssetId).then(feeCurrency => {
        return Object.assign(copyMandatoryAttributes(tx), {
            recipient: tx.recipient,
            fee: Money.fromCoins(tx.fee, feeCurrency),
            amount: Money.fromCoins(tx.amount, Currency.WAVES),
            status: tx.status
        })
    });
};

const transformLeaseCancel = async (currencyService, tx) => {
    const {amount} = (await currencyService.getApi().transactions.info(tx.leaseId)).data;
    const feeCurrency = await currencyService.get(tx.feeAssetId)
    return Object.assign(copyMandatoryAttributes(tx), {
        amount: Money.fromCoins(amount, Currency.WAVES),
        fee: Money.fromCoins(tx.fee, feeCurrency),
        leaseId: tx.leaseId,
        recipient: tx.lease ? tx.lease.recipient : null
    });
};

const transformExchange = (currencyService, tx) => {
    const buyOrder = tx.order1.orderType === 'buy' ? tx.order1 : tx.order2;
    const sellOrder = tx.order2.orderType === 'sell' ? tx.order2 : tx.order1;
    const assetPair = buyOrder.assetPair;

    return Promise.all([
        currencyService.get(assetPair.amountAsset),
        currencyService.get(assetPair.priceAsset),
        currencyService.get(tx.feeAssetId),
        currencyService.get(buyOrder.matcherFeeAssetId),
        currencyService.get(sellOrder.matcherFeeAssetId),
    ]).then(tuple => {
        const currencyPair = {
            amountAsset: tuple[0],
            priceAsset: tuple[1]
        };

        const feeAsset = tuple[2];
        const buyFeeAsset = tuple[3];
        const sellFeeAsset = tuple[4];
        const price = OrderPrice.fromBackendPrice(tx.price, currencyPair);
        const amount = Money.fromCoins(tx.amount, currencyPair.amountAsset);

        return Object.assign(copyMandatoryAttributes(tx), {
            fee: Money.fromCoins(tx.fee, feeAsset),
            buyFee: Money.fromCoins(tx.buyMatcherFee, buyFeeAsset),
            sellFee: Money.fromCoins(tx.sellMatcherFee, sellFeeAsset),
            price,
            amount,
            total: price.volume(amount),
            buyOrder: transformOrder(buyOrder, currencyPair, buyFeeAsset),
            sellOrder: transformOrder(sellOrder, currencyPair, sellFeeAsset),
            seller: sellOrder.sender,
            buyer: buyOrder.sender,
            applicationStatus: tx.applicationStatus,
        });
    });
};

const transformOrder = (order, assetPair, feeAsset) => {
    return {
        id: order.id,
        sender: order.sender,
        assetPair,
        orderType: order.orderType,
        amount: Money.fromCoins(order.amount, assetPair.amountAsset),
        price: OrderPrice.fromBackendPrice(order.price, assetPair),
        timestamp: new DateTime(order.timestamp),
        expiration: new DateTime(order.expiration),
        fee: Money.fromCoins(order.matcherFee, feeAsset)
    };
};

const transformBurn = (currencyService, tx) => {
    return currencyService.get(tx.assetId).then(currency => {
        return Object.assign(copyMandatoryAttributes(tx), {
            amount: Money.fromCoins(tx.amount || tx.quantity, currency),
            fee: Money.fromCoins(tx.fee, Currency.WAVES)
        });
    });
};

const transformReissue = (currencyService, tx) => {
    return currencyService.get(tx.assetId).then(currency => {
        return Object.assign(copyMandatoryAttributes(tx), {
            amount: Money.fromCoins(tx.quantity, currency),
            fee: Money.fromCoins(tx.fee, Currency.WAVES),
            reissuable: tx.reissuable,

        });
    });
};

const transformIssue = (currencyService, tx) => {
    const c = Currency.fromIssueTransaction(tx);
    currencyService.put(c);

    return currencyService.get(c.id).then(currency => {
        return Object.assign(copyMandatoryAttributes(tx), {
            amount: Money.fromCoins(tx.quantity, currency),
            fee: Money.fromCoins(tx.fee, Currency.WAVES),
            name: tx.name,
            reissuable: tx.reissuable,
            decimals: tx.decimals,
            description: tx.description,
            script: tx.script,
            assetId: tx.assetId
        });
    });
};

const transformTransfer = async (currencyService, assetService, spamDetectionService, tx) => {
    const details = tx.assetId && await assetService.loadDetails(tx.assetId)

    const pair = await loadAmountAndFeeCurrencies(currencyService, details ? details.originTransactionId : null, tx.feeAssetId)
    const amountCurrency = pair[0];
    const feeCurrency = pair[1];

    return Object.assign(copyMandatoryAttributes(tx), {
        amount: Money.fromCoins(tx.amount, amountCurrency),
        fee: Money.fromCoins(tx.fee, feeCurrency),
        attachment: attachmentToString(tx.attachment),
        recipient: tx.recipient,
        isSpam: spamDetectionService.isSpam(tx.assetId)
    });
};

const transformGenesis = (currencyService, tx) => {
    const amount = Money.fromCoins(tx.amount, Currency.WAVES);
    const fee = Money.fromCoins(tx.fee, Currency.WAVES);

    return Object.assign(copyMandatoryAttributes(tx), {
        amount,
        fee,
        recipient: tx.recipient,
        height: 1
    });
};

export class TransactionTransformerService {
    constructor(currencyService, spamDetectionService, stateChangeService, assetService) {
        this.currencyService = currencyService;
        this.spamDetectionService = spamDetectionService;
        this.stateChangeService = stateChangeService;
        this.assetService = assetService;
    }

    transform = (input) => {
        return Array.isArray(input)
            ? transformMultiple(this.currencyService,
                this.spamDetectionService, this.stateChangeService, this.assetService, input)
            : transformSingle(this.currencyService,
                this.spamDetectionService, this.stateChangeService, this.assetService, input)
    };
}
