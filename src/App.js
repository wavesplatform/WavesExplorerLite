import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './styles/main.scss';
import {Route, Redirect, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';

import {routeParams, routeBuilder} from './shared/Routing';
import Search from './Search';
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
}

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="header grid">
                    <div className="header-title grid-item-fixed grid">
                        <div className="menu-toggle grid-item-fixed lg-show xlg-hide"></div>
                        <div className="logo"></div>
                    </div>
                    <Search />
                </div>
                <div className="container grid">
                     <NavBar {...this.props} />
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
            </React.Fragment>
        );
    }
}

export default hot(module)(withNetworkRouter(App));
