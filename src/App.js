import React from 'react';
import { hot } from 'react-hot-loader';
import './styles/main.scss';
import {Route, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';
import ScrollToTop from 'react-scroll-up';

import {routeParams, routes} from './shared/Routing';
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

import ServiceFactory from './services/ServiceFactory';

class App extends React.Component {
    state = {
        mobileMenuVisible: null
    };

    handleMobileMenuToggle = () => {
        this.setState({mobileMenuVisible: !this.state.mobileMenuVisible});
    };

    go = (route) => {
        this.props.history.push(route);
    };

    onSearch = (query) => {
        const searchService = ServiceFactory.searchService();

        return searchService.search(query).then(route => this.go(route));
    };

    render() {
        const isVisible = this.state.mobileMenuVisible;
        const isAnimated = isVisible != null;
        let wrapperClassName = 'wrapper' + (isVisible ? ' show' : '') + (isAnimated ? ' animated' : '');

        return (
            <Router>
                <React.Fragment>
                <div className={wrapperClassName}>
                    <Header onMenuToggle={this.handleMobileMenuToggle}>
                        <Search onSearch={this.onSearch} />
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
                    <div className="fading" onClick={this.handleMobileMenuToggle}></div>
                </div>
                <div className="mobile-menu">
                    <Header onMenuToggle={this.handleMobileMenuToggle} />
                    <NavBar appearance="mobile" />
                </div>
                <ScrollToTop showUnder={100}>
                    <div className="scroll-button"></div>
                </ScrollToTop>
                </React.Fragment>
            </Router>
        );
    }
}

export default hot(module)(App);
