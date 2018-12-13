import React from 'react';

import {routes} from '../shared/Routing';
import GoBack from '../shared/GoBack';
import AddressRef from '../shared/AddressRef';
import Headline from '../shared/Headline';
import CopyButton from '../shared/CopyButton';
import Dictionary from '../shared/Dictionary';
import Loader from '../shared/Loader';

import ServiceFactory from '../services/ServiceFactory';

import BlockEnumerator from './BlockEnumerator';
import TransactionList from './TransactionList';

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

export default class SingleBlockPage extends React.Component {
    state = {
        currentHeight: parseInt(this.props.match.params.height),
        maxHeight: parseInt(this.props.match.params.height) + 1,
        block: {
            timestamp: {},
            generator: ''
        },
        groupedTransactions: {}
    };

    componentDidUpdate(prevProps) {
        if (this.props.match.params.height !== prevProps.match.params.height) {
            const height = parseInt(this.props.match.params.height);
            this.setState({currentHeight: height});
            this.fetchData(height);
        }
    }

    initialFetch = () => {
        return this.fetchData(this.state.currentHeight);
    };

    fetchData = height => {
        return ServiceFactory.blockService().loadBlock(height)
            .then(result => this.setState(result));
    };

    showBlock = height => {
        this.props.history.push(routes.blocks.one(height));
    };

    render() {
        const dictionaryItems = this.stateToDictionaryItems();
        return (
            <Loader fetchData={this.initialFetch} errorTitle="Failed to load block">
                <React.Fragment>
                    <GoBack />
                    <Headline title="Block" subtitle={this.state.currentHeight.toString()} copyVisible={false} />
                    <Dictionary items={dictionaryItems} />

                    {Object.keys(this.state.groupedTransactions).map(type => {
                        const numericType = parseInt(type);
                        const header = typeToHeader(numericType);
                        return <TransactionList key={numericType} type={numericType} header={header}
                                                transactions={this.state.groupedTransactions[type]}/>
                    })}
                </React.Fragment>
            </Loader>
        );
    }

    stateToDictionaryItems() {
        const items = [{
            label: 'Height',
            value: (
                <BlockEnumerator
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
            value: <React.Fragment>{this.state.block.timestamp.time}, {this.state.block.timestamp.date}</React.Fragment>
        }, {
            label: 'Transactions',
            value: this.state.block.transactionCount
        }, {
            label: 'Parent block',
            value: this.state.block.reference,
            action: <CopyButton text={this.state.block.reference}/>
        }, {
            label: 'Generator',
            value: <AddressRef address={this.state.block.generator}/>
        }, {
            label: 'Signature',
            value: this.state.block.signature,
            action: <CopyButton text={this.state.block.signature}/>
        }, {
            label: 'Size',
            value: <React.Fragment>{this.state.block.blocksize} bytes</React.Fragment>
        }];

        return items;
    }
}
