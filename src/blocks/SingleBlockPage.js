import React from 'react';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';

import {apiBuilder, replaceTimestampWithDateTime} from '../shared/NodeApi';
import {routeBuilder} from '../shared/Routing';
import GoBack from '../shared/GoBack';
import TransactionRef from '../shared/TransactionRef';
import AddressRef from '../shared/AddressRef';
import Headline from '../shared/Headline';
import CopyButton from '../shared/CopyButton';

import BlockEnumerator from './BlockEnumerator';
import Dictionary from './Dictionary';
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
            break;
    }

    return result;
};

export default class SingleBlockPage extends React.Component {

    state = {
        currentHeight: parseInt(this.props.match.params.height),
        maxHeight: parseInt(this.props.match.params.height) + 1,
        block: {
            timestamp: {}
        }
    };

    componentDidMount() {
        this.fetchData(this.state.currentHeight);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.height !== prevProps.match.params.height) {
            const height = parseInt(this.props.match.params.height);
            this.setState({currentHeight: height});
            this.fetchData(height);
        }
    }

    fetchData = height => {
        const {networkId} = this.props.match.params;
        const api = apiBuilder(networkId);

        api.blocks.height().then(heightResponse => {
            this.setState({maxHeight: heightResponse.data.height});
        });

        api.blocks.at(height).then(blockResponse => {
            this.setState({block: blockResponse.data});
        });
    };

    showBlock = height => {
        const {networkId} = this.props.match.params;
        const route = routeBuilder(networkId);
        this.props.history.push(route.blocks.one(height));
    };

    render() {
        const dictionaryItems = this.stateToDictionaryItems();
        const transactions = this.state.block.transactions ?
            this.state.block.transactions.map(replaceTimestampWithDateTime) : [];
        const groupedTransactions = transactions ? groupBy(transactions, 'type') : {};

        return (
            <React.Fragment>
                <GoBack />
                <Headline title="Block" subtitle={this.state.currentHeight.toString()} copyVisible={false} />
                <Dictionary items={dictionaryItems} />

                {Object.keys(groupedTransactions).map(type => {
                    const numericType = parseInt(type);
                    const header = typeToHeader(numericType);
                    return <TransactionList key={numericType} type={numericType} header={header}
                                            transactions={groupedTransactions[type]}/>
                })}

                <div className="headline2">
                    <span className="title">Transactions</span>
                    <span className="title-details"> — Type 4</span>
                    <span className="action">Hide list</span>
                </div>
                <table className="table-sm-transform">
                    <thead>
                    <tr>
                        <th>ID / Timestamp</th>
                        <th>Sender / Recipient</th>
                        <th className="amount">Amount / Fee</th>
                        <th className="price">Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td data-label="ID / Timestamp">
                            <div className="line no-wrap"><TransactionRef
                                txId="CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS"/></div>
                            <div className="line"><label>00:00:00, 00.00.0000</label></div>
                        </td>
                        <td data-label="Sender / Recipient">
                            <div className="arrow asset-transfer in"></div>
                            <div className="line no-wrap"><AddressRef address="3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he"
                                                                      appearance="regular"/></div>
                            <div className="line no-wrap"><AddressRef address="3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3"
                                                                      appearance="regular"/></div>
                        </td>
                        <td data-label="Amount / Fee">
                            <div className="line">1000.0000000</div>
                            <div className="line"><label>0.001 WAVES</label></div>
                        </td>
                        <td data-label="Price">
                            <div className="line"><a>XDTC</a></div>
                        </td>
                    </tr>
                    <tr>
                        <td data-label="ID / Timestamp">
                            <div className="line no-wrap"><TransactionRef
                                txId="CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS"/></div>
                            <div className="line"><label>00:00:00, 00.00.0000</label></div>
                        </td>
                        <td data-label="Sender / Recipient">
                            <div className="arrow asset-transfer in"></div>
                            <div className="line no-wrap"><AddressRef address="3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he"
                                                                      appearance="regular"/></div>
                            <div className="line no-wrap"><AddressRef address="3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3"
                                                                      appearance="regular"/></div>
                        </td>
                        <td data-label="Amount / Fee">
                            <div className="line">1000.0000000</div>
                            <div className="line"><label>0.001 WAVES</label></div>
                        </td>
                        <td data-label="Price">
                            <div className="line"><a>XDTC</a></div>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div className="headline2">
                    <span className="title">Exchanges</span>
                    <span className="title-details"> — Type 7</span>
                    <span className="action">Hide list</span>
                </div>
                <table className="table-sm-transform">
                    <thead>
                    <tr>
                        <th>ID / Timestamp</th>
                        <th>Seller / Buyer</th>
                        <th className="amount">Amount / Total</th>
                        <th className="price">Pair / Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td data-label="ID / Timestamp">
                            <div className="line no-wrap"><TransactionRef
                                txId="CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS"/></div>
                            <div className="line"><label>00:00:00, 00.00.0000</label></div>
                        </td>
                        <td data-label="Seller / Buyer">
                            <div className="arrow exchange"></div>
                            <div className="line no-wrap"><AddressRef address="3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he"
                                                                      appearance="regular"/></div>
                            <div className="line no-wrap"><AddressRef address="3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3"
                                                                      appearance="regular"/></div>
                        </td>
                        <td data-label="Amount / Total">
                            <div className="line">7.69536906</div>
                            <div className="line bold">406.70541687</div>
                        </td>
                        <td data-label="Pair / Price">
                            <div className="line"><a>ZEC</a> / WAVES</div>
                            <div className="line bold">53.24051565</div>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div className="headline2">
                    <span className="title">Leasing</span>
                    <span className="title-details"> — Type 8</span>
                    <span className="action">Hide list</span>
                </div>
                <table className="table-sm-transform">
                    <thead>
                    <tr>
                        <th>ID / Timestamp</th>
                        <th>Sender / Recipient</th>
                        <th className="amount">Amount / Fee</th>
                        <th className="price"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td data-label="ID / Timestamp">
                            <div className="line no-wrap"><TransactionRef
                                txId="CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS"/></div>
                            <div className="line"><label>00:00:00, 00.00.0000</label></div>
                        </td>
                        <td data-label="Sender / Recipient">
                            <div className="arrow mass-payment out"></div>
                            <div className="line no-wrap"><AddressRef address="3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he"
                                                                      appearance="regular"/></div>
                            <div className="line no-wrap"><AddressRef address="3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3"
                                                                      appearance="regular"/></div>
                        </td>
                        <td data-label="Amount / Fee">
                            <div className="line">1000.0000000</div>
                            <div className="line"><label>0.001 WAVES</label></div>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div className="headline2">
                    <span className="title">Cancel leasing </span>
                    <span className="title-details"> — Type 9</span>
                    <span className="action">Unhide list</span>
                </div>
                <table className="table-sm-transform table-hide">
                    <thead>
                    <tr>
                        <th>ID / Timestamp</th>
                        <th>Seller / Buyer</th>
                        <th className="amount">Amount / Total</th>
                        <th className="price">Pair / Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td data-label="ID / Timestamp">
                            <div className="line no-wrap"><TransactionRef
                                txId="CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS"/></div>
                            <div className="line"><label>00:00:00, 00.00.0000</label></div>
                        </td>
                        <td data-label="Seller / Buyer">
                            <div className="line no-wrap"><AddressRef address="3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he"
                                                                      appearance="regular"/></div>
                            <div className="line no-wrap"><AddressRef address="3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3"
                                                                      appearance="regular"/></div>
                        </td>
                        <td data-label="Amount / Total">
                            <div className="line">7.69536906</div>
                            <div className="line bold">406.70541687</div>
                        </td>
                        <td data-label="Pair / Price">
                            <div className="line"><a>ZEC</a> / WAVES</div>
                            <div className="line bold">53.24051565</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </React.Fragment>
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
