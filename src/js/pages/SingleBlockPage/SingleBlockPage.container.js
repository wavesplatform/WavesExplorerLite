import React from 'react';

import {routeBuilder} from '../../shared/Routing';
import ServiceFactory from '../../services/ServiceFactory';

import GoBack from '../../components/GoBack';
import EndpointRef from '../../components/EndpointRef';
import Headline from '../../components/Headline';
import CopyButton from '../../components/CopyButton';
import Dictionary from '../../components/Dictionary';
import Loader from '../../components/Loader';

import {BlockEnumerator} from './BlockEnumerator.view';
import {TransactionList} from './TransactionList.container';

const typeToHeader = type => {
    let result = {
        id: 'ID / Timestamp',
        subjects: 'Sender / Recipient',
        amount: 'Amount / Fee',
        price: 'Price'
    };

    switch (type) {
        case 3:
            result.subjects = 'Issuer / Asset ID';
            result.amount = 'Quantity / Fee';
            result.price = 'Asset name';
            break;

        case 4:
        case 11:
            result.price = 'Asset';
            break;

        case 7:
            result.subjects = 'Seller / Buyer';
            result.amount = 'Amount / Total';
            result.price = 'Pair / Price';
            break;

        case 8:
            result.price = undefined;
            break;

        case 9:
            result.price = undefined;
            result.amount = 'Fee';
            break;

        case 10:
            result.amount = 'Fee';
            break;
    }

    return result;
};

export class SingleBlockPage extends React.Component {
    state = {
        currentHeight: parseInt(this.props.match.params.height),
        maxHeight: parseInt(this.props.match.params.height) + 1,
        block: {
            timestamp: {},
            generator: ''
        },
        groupedTransactions: {},
        loading: false
    };

    componentDidUpdate(prevProps) {
        const {height: prevHeight, networkId: prevNetworkId} = prevProps.match.params;
        const {height, networkId} = this.props.match.params;

        if (height !== prevHeight || networkId !== prevNetworkId) {
            this.setState({currentHeight: parseInt(height)});
            this.fetchData(height)
                .catch(error => {
                    ServiceFactory.global().errorReportingService().captureException(error);
                });
        }
    }

    initialFetch = () => {
        return this.fetchData(this.state.currentHeight);
    };

    fetchData = height => {
        this.setState({loading: true});

        const {networkId} = this.props.match.params;
        return ServiceFactory
            .forNetwork(networkId)
            .blockService()
            .loadBlock(height)
            .then(result => this.setState(result))
            .finally(() => this.setState({loading: false}));
    };

    showBlock = height => {
        const {networkId} = this.props.match.params;
        const routes = routeBuilder(networkId);
        this.props.history.push(routes.blocks.one(height));
    };

    render() {
        const dictionaryItems = this.stateToDictionaryItems();
        return (
            <Loader fetchData={this.initialFetch} errorTitle="Failed to load block">
                <div className="content card">
                    <GoBack />
                    <Headline title="Block" subtitle={this.state.currentHeight.toString()} copyVisible={false} />
                    <Dictionary items={dictionaryItems} />

                    {Object.keys(this.state.groupedTransactions).map(type => {
                        const numericType = parseInt(type);
                        const header = typeToHeader(numericType);
                        return <TransactionList key={numericType} type={numericType} header={header}
                                                transactions={this.state.groupedTransactions[type]}/>
                    })}
                </div>
            </Loader>
        );
    }

    stateToDictionaryItems() {
        const items = {
            default: [{
                label: 'Height',
                value: (
                    <BlockEnumerator
                        disabled={this.state.loading}
                        height={this.state.currentHeight}
                        hasPrev={this.state.currentHeight > 1}
                        hasNext={this.state.currentHeight < this.state.maxHeight}
                        onNext={() => this.showBlock(this.state.currentHeight + 1)}
                        onPrev={() => this.showBlock(this.state.currentHeight - 1)}/>
                )
            }, {
                label: 'Version',
                value: this.state.block.version
            }, {
                label: 'Timestamp',
                value:
                    <React.Fragment>{this.state.block.timestamp.time}, {this.state.block.timestamp.date}</React.Fragment>
            }, {
                label: 'Transactions',
                value: this.state.block.transactionCount
            }, {
                label: 'Parent block',
                value: this.state.block.reference,
                action: <CopyButton text={this.state.block.reference}/>
            }, {
                label: 'Generator',
                value: <EndpointRef endpoint={this.state.block.generator}/>
            }, {
                label: 'Signature',
                value: this.state.block.signature,
                action: <CopyButton text={this.state.block.signature}/>
            }, {
                label: 'Size',
                value: <React.Fragment>{this.state.block.blocksize} bytes</React.Fragment>
            }]
        };

        return items;
    }
}
