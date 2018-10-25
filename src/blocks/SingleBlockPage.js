import React from 'react';
import PropTypes from 'prop-types';

import {apiBuilder} from '../shared/NodeApi';
import {routeBuilder} from '../shared/Routing';
import GoBack from '../shared/GoBack';
import TransactionRef from '../shared/TransactionRef';
import AddressRef from '../shared/AddressRef';
import Headline from '../shared/Headline';
import BlockEnumerator from './BlockEnumerator';

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
        return (
            <React.Fragment>
                <GoBack />
                <Headline title="Block" subtitle={this.state.currentHeight.toString()} copyVisible={false} />
                <div className="dictionary">
                    <div className="dictionary-pair">
                        <div className="dictionary-pair-key"><span>Height</span></div>
                        <div className="dictionary-pair-value">
                            <BlockEnumerator
                                height={this.state.currentHeight}
                                hasPrev={this.state.currentHeight > 1}
                                hasNext={this.state.currentHeight < this.state.maxHeight}
                                onNext={() => this.showBlock(this.state.currentHeight + 1)}
                                onPrev={() => this.showBlock(this.state.currentHeight - 1)}/>
                        </div>
                    </div>
                    <div className="dictionary-pair">
                        <div className="dictionary-pair-key">Version</div>
                        <div className="dictionary-pair-value">{this.state.block.version}</div>
                    </div>
                    <div className="dictionary-pair">
                        <div className="dictionary-pair-key">Timestamp</div>
                        <div className="dictionary-pair-value">{this.state.block.timestamp.time}, {this.state.block.timestamp.date}</div>
                    </div>
                    <div className="dictionary-pair">
                        <div className="dictionary-pair-key">Transactions</div>
                        <div className="dictionary-pair-value">{this.state.block.transactionCount}</div>
                    </div>
                    <div className="dictionary-pair">
                        <div className="dictionary-pair-key">Parent block</div>
                        <div className="dictionary-pair-value">{this.state.block.reference}</div>
                        <div className="dictionary-action">
                            <div className="btn btn-copy">Copy</div>
                        </div>
                    </div>
                    <div className="dictionary-pair">
                        <div className="dictionary-pair-key">Generator</div>
                        <div className="dictionary-pair-value"><AddressRef address={this.state.block.generator}/></div>
                    </div>
                    <div className="dictionary-pair">
                        <div className="dictionary-pair-key"><span>Signature</span></div>
                        <div className="dictionary-pair-value">{this.state.block.signature}</div>
                        <div className="dictionary-action">
                            <div className="btn btn-copy">Copy</div>
                        </div>
                    </div>
                    <div className="dictionary-pair">
                        <div className="dictionary-pair-key">Size</div>
                        <div className="dictionary-pair-value">{this.state.block.blocksize} bytes</div>
                    </div>
                </div>
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
}
