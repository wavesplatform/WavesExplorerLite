import React from 'react';

import GoBack from '../shared/GoBack';
import AddressRef from '../shared/AddressRef';
import TransactionRef from '../shared/TransactionRef';
import Headline from '../shared/Headline';

export default class SingleAddressPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <GoBack />
                <Headline title="Address" subtitle="3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3"/>
                <div class="info-box grid grid-wrap">
                    <div>
                        <div class="line"><label>Regular Balance</label></div>
                        <div class="line">2,267.06009303</div>
                    </div>
                    <div>
                        <div class="line"><label>Generating Balance</label></div>
                        <div class="line">2,256.40761552</div>
                    </div>
                    <div>
                        <div class="line"><label>Available Balance</label></div>
                        <div class="line">2,267.06009303</div>
                    </div>
                    <div>
                        <div class="line"><label>Effective Balance</label></div>
                        <div class="line">2,268.56209303</div>
                    </div>
                </div>
                <div class="page-navigation">
                    <span class="page-link bold disabled">Last 100 transactions</span>
                    <span class="page-link bold"><a class="no-style" href="general_address_aliases.html">Aliases</a></span>
                    <span class="page-link bold"><a class="no-style" href="general_address_assets.html">Assets</a></span>
                </div>
                <table class="address-tr-list table-sm-transform">
                    <thead>
                    <tr>
                        <th>ID / Type</th>
                        <th class="timestamp">Timestamp</th>
                        <th>Sender / Receiver</th>
                        <th class="amount">Amount in / out</th>
                        <th class="price">Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td data-label="ID / Type">
                            <div class="line no-wrap"><TransactionRef txId="CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS"/></div>
                            <div class="line"><label>Exchange</label></div>
                        </td>
                        <td data-label="Timestamp" class="timestamp">
                            <div class="line"><label>00:00:00</label></div>
                            <div class="line"><label>00.00.0000</label></div>
                        </td>
                        <td data-label="Sender / Receiver">
                            <div class="arrow arrow-transaction-exchange"></div>
                            <div class="line no-wrap"><AddressRef address="3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he" appearance="regular"/></div>
                            <div class="line no-wrap"><label>3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3</label></div>
                        </td>
                        <td data-label="Amount in / out">
                            <div class="line">182.56761789 WAVES</div>
                            <div class="line">0.09787450 BTC</div>
                        </td>
                        <td data-label="Price">
                            <div class="line">245.28404366</div>
                            <div class="line"><label>WAVES</label></div>
                        </td>
                    </tr>
                    <tr>
                        <td data-label="ID / Type">
                            <div class="line no-wrap"><TransactionRef txId="CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS"/></div>
                            <div class="line"><label>Mass payment</label></div>
                        </td>
                        <td data-label="Timestamp" class="timestamp">
                            <div class="line"><label>00:00:00</label></div>
                            <div class="line"><label>00.00.0000</label></div>
                        </td>
                        <td data-label="Sender / Receiver">
                            <div class="arrow arrow-transaction-masspay"></div>
                            <div class="line no-wrap"><AddressRef address="3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he" appearance="regular"/></div>
                        </td>
                        <td data-label="Amount in / out">
                            <div class="line">100000.00000000 profitbot</div>
                        </td>
                        <td data-label="Price">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}
