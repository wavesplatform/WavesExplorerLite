import React from 'react';

import EventBuilder from '../../shared/analytics/EventBuilder';
import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import Headline from '../../components/Headline';
import {TickerList} from './TickerList.view';

export class TickerPage extends React.Component {
    state = {
        tickers: []
    };

    componentDidMount() {
        const event = new EventBuilder().tickers().events().show().build();
        ServiceFactory.global().analyticsService().sendEvent(event);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.networkId !== prevProps.match.params.networkId) {
            this.fetchData();
        }
    }
    fetchData = () => {
        const {networkId} = this.props.match.params;
        return ServiceFactory
            .forNetwork(networkId)
            .tickersService()
            .loadTickers()
            .then(tickers => this.setState({tickers}));


    };

    render() {
        const {networkId} = this.props.match.params;
        const configuration = ServiceFactory.global().configurationService().get(networkId);
        this.state.tickers.sort((a, b) => (b.volume - a.volume));
        //filter zero value:
        //-- .filter(a=> a.volume !== '0.00000000');
        return (
            <div className="loaderWrapper">
                <Loader fetchData={this.fetchData} errorTitle="Failed to load ticker details">
                    <div className="content card">
                        <Headline title={`${configuration.displayName} TurtleCap`} copyVisible={false}/>
                        <TickerList tickers={this.state.tickers} />
                    </div>
                </Loader>
            </div>
        );
    }
}
