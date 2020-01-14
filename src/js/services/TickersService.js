import axios from 'axios';

import {dataFeedApi} from '../shared/api/DataFeedApi';
import {ApiClientService} from './ApiClientService';

export class TickersService extends ApiClientService {
    constructor(configurationService, networkId) {
        super(configurationService, networkId);
    }

    loadTickers = () => {
        const configuration = this.configuration();
        const tickers = configuration.tickers.slice();
        const promises = tickers.map((ticker, index) => {
            const api = dataFeedApi(configuration.dataFeedBaseUrl
            );
            return axios.all([
                api.tickerData(ticker.asset +
                    "/" +
                    ticker.priceAsset)
            ]).then(axios.spread((tickerData) => {
                const newTicker = {
                    ...ticker,
                    volume: tickerData.data['24h_volume'],
                    low: tickerData.data['24h_low'],
                    high: tickerData.data['24h_high'],
                    close: tickerData.data['24h_close']
                };

                return {
                    index,
                    ticker: newTicker
                };
            }))
        });

        return Promise.all(promises).then(values => {
            values.forEach(item => {
                tickers[item.index] = item.ticker;
            });

            return tickers;
        });
    }
}
