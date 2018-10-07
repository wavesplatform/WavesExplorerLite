import React from 'react';

import GoBack from '../shared/GoBack';
import Headline from '../shared/Headline';

import TransactionList from './TransactionList';
import AssetList from './AssetList';
import GroupedAliasList from './GroupedAliasList';

const transactions = [{
    id: 'CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS',
    type: 7,
    date: '00.00.0000',
    time: '00:00:00',
    sender: '3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he',
    recipient: '3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3',
    in: {
        amount: '182.56761789',
        currency: 'WAVES'
    },
    out: {
        amount: '0.09787450',
        currency: 'BTC'
    },
    price: {
        amount: '245.28404366',
        currency: 'WAVES'
    }
}, {
    id: 'CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS',
    type: 11,
    date: '00.00.0000',
    time: '00:00:00',
    recipient: '3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he',
    in: {
        amount: '100000.00000000',
        currency: 'profitbot'
    },
    spam: true
}];

const assets = [{
    id: '96MaKscZERV8bHaPvXcBRaEab881Hj2Kywja4uzgE100',
    name: 'MrBigMike',
    amount: '284,949.48281863'
}];

const aliases = [{
    letter: 'M',
    aliases: ['MrBigMike', 'Mfhdjs#&42_32f', 'Mike32341531']
}, {
    letter: 'N',
    aliases: ['NfhdLdf44852572547', 'Nnnnnnnn', 'N___fds#@3', 'nnnnbnn3', 'Nn321', 'n_341f', 'NinaAd', 'Noki-Poki']
}];

export default class SingleAddressPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <GoBack />
                <Headline title="Address" subtitle="3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3"/>
                <div className="info-box grid grid-wrap">
                    <div>
                        <div className="line"><label>Regular Balance</label></div>
                        <div className="line">2,267.06009303</div>
                    </div>
                    <div>
                        <div className="line"><label>Generating Balance</label></div>
                        <div className="line">2,256.40761552</div>
                    </div>
                    <div>
                        <div className="line"><label>Available Balance</label></div>
                        <div className="line">2,267.06009303</div>
                    </div>
                    <div>
                        <div className="line"><label>Effective Balance</label></div>
                        <div className="line">2,268.56209303</div>
                    </div>
                </div>
                <div className="page-navigation">
                    <span className="page-link bold disabled">Last 100 transactions</span>
                    <span className="page-link bold"><a className="no-style" href="general_address_aliases.html">Aliases</a></span>
                    <span className="page-link bold"><a className="no-style" href="general_address_assets.html">Assets</a></span>
                </div>
                {/*<TransactionList transactions={transactions} />*/}
                {/*<AssetList assets={assets} />*/}
                <GroupedAliasList aliases={aliases} />
            </React.Fragment>
        );
    }
}
