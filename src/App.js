import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './styles/main.scss';
import {Route, Redirect, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';

import {routeParams, routeBuilder} from './shared/Routing';
import Search from './Search';
import Header from './Header';
import NavBar from './NavBar';
import MainPage from './main/MainPage';
import PeersPage from './peers/PeersPage';
import NodesPage from './nodes/NodesPage';
import BlocksPage from './blocks/BlocksPage';
import SingleBlockPage from './blocks/SingleBlockPage';
import SingleTransactionPage from './transactions/SingleTransactionPage';
import SingleAddressPage from './addresses/SingleAddressPage';

const routes = routeBuilder(routeParams.networkId);

const withNetworkRouter = (RootComponent) => {
   return class extends React.Component {
       render() {
           return (
               <Router>
                   <Switch>
                       <Route exact path="/" render={() => (<Redirect to="/mainnet" />)} />
                       <Route path={routes.root} component={RootComponent} />
                   </Switch>
               </Router>
           );
       }
   };
};

class App extends Component {
    state = {
        mobileMenuVisible: false
    };

    handleMobileMenuToggle = () => {
        this.setState({mobileMenuVisible: !this.state.mobileMenuVisible});
    };

    render() {
        let wrapperClassName = 'wrapper';
        if (this.state.mobileMenuVisible) {
            wrapperClassName += ' show';
        }

        return (
            <React.Fragment>
                <div className={wrapperClassName}>
                    <Header onMenuToggle={this.handleMobileMenuToggle}>
                        <Search />
                    </Header>
                    <div className="container grid">
                        <NavBar />
                        <div className="content card">
                        <Switch>
                            <Route exact path={routes.blocks.list} component={BlocksPage} />
                            <Route exact path={routes.blocks.one(routeParams.blockHeight)} component={SingleBlockPage} />
                            <Route path={routes.nodes.list} component={NodesPage} />
                            <Route path={routes.peers.list} component={PeersPage} />
                            <Route exact path={routes.transactions.one(routeParams.transactionId)} component={SingleTransactionPage} />
                            <Route exact path={routes.addresses.one(routeParams.address)} component={SingleAddressPage} />
                            <Route path={routes.root} component={MainPage} />
                        </Switch>
                        </div>
                    </div>
                </div>
                <div className="mobile-menu">
                    <Header onMenuToggle={this.handleMobileMenuToggle} />
                    <NavBar appearance="mobile" />
                </div>
            </React.Fragment>
        );
    }
}

export default hot(module)(withNetworkRouter(App));
