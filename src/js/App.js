import React from 'react';
import {hot} from 'react-hot-loader';
import '../styles/main.scss';
import {Route, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';
import ScrollToTop from 'react-scroll-up';

import {routeParamsBuilder, routeBuilder} from './shared/Routing';
import ServiceFactory from './services/ServiceFactory';
import {TOOLTIP_ID} from './shared/constants';
import Tooltip from './components/Tooltip';
import Search from './Search';
import Header from './Header';
import NavBar from './NavBar';
import MainPage from './pages/MainPage';
import PeersPage from './pages/PeersPage';
import NodesPage from './pages/NodesPage';
import BlocksPage from './pages/BlocksPage';
import SingleBlockPage from './pages/SingleBlockPage';
import SingleTransactionPage from './pages/SingleTransactionPage';
import SingleAddressPage from './pages/SingleAddressPage';
import SingleAliasPage from './pages/SingleAliasPage';
import SingleAssetPage from './pages/SingleAssetPage';
import FaucetPage from './pages/FaucetPage'
import UnsupportedPage from './pages/UnsupportedPage';

const routeParams = routeParamsBuilder(ServiceFactory.global().configurationService().all());
const routes = routeBuilder(routeParams.networkId);

ServiceFactory.global().errorReportingService().initialize();
ServiceFactory.global().analyticsService().initialize();

const withNetworkRouter = (RootComponent) => {
    return class extends React.Component {
        render() {
            return (
                <Router>
                    <Switch>
                        <Route path={routes.root} component={RootComponent} />
                    </Switch>
                </Router>
            );
        }
    };
};

class App extends React.Component {
    state = {
        mobileMenuVisible: null
    };

    componentDidCatch(error, errorInfo) {
        ServiceFactory
            .global()
            .errorReportingService()
            .captureComponentError(error, errorInfo);
    }

    handleMobileMenuToggle = () => {
        this.setState({mobileMenuVisible: !this.state.mobileMenuVisible});
    };

    render() {
        const isVisible = this.state.mobileMenuVisible;
        const isAnimated = isVisible != null;
        let wrapperClassName = 'wrapper' + (isVisible ? ' show' : '') + (isAnimated ? ' animated' : '');

        return <UnsupportedPage/>;

        return (
            <React.Fragment>
                <div className={wrapperClassName}>
                    <Header onMenuToggle={this.handleMobileMenuToggle}>
                        <Search />
                    </Header>
                    <div className="container grid">
                        <NavBar />
                        <Switch>
                            <Route exact path={routes.blocks.one(routeParams.blockHeight)} component={SingleBlockPage} />
                            <Route exact path={routes.blocks.list} component={BlocksPage} />
                            <Route exact path={routes.transactions.one(routeParams.transactionId)} component={SingleTransactionPage} />
                            <Route exact path={routes.addresses.one(routeParams.address)} component={SingleAddressPage} />
                            <Route exact path={routes.addresses.one(routeParams.address, routeParams.tab)} component={SingleAddressPage} />
                            <Route exact path={routes.aliases.one(routeParams.alias)} component={SingleAliasPage} />
                            <Route exact path={routes.assets.one(routeParams.assetId)} component={SingleAssetPage} />
                            <Route path={routes.nodes.list} component={NodesPage} />
                            <Route path={routes.peers.list} component={PeersPage} />
                            <Route exact path={routes.faucet} component={FaucetPage} />
                            <Route path={routes.root} component={MainPage} />
                        </Switch>
                    </div>
                    <div className="fading" onClick={this.handleMobileMenuToggle}></div>
                </div>
                <div className="mobile-menu">
                    <Header onMenuToggle={this.handleMobileMenuToggle} />
                    <NavBar appearance="mobile" onAfterNavigate={this.handleMobileMenuToggle} />
                </div>
                <Tooltip id={TOOLTIP_ID}/>
                <ScrollToTop showUnder={100}>
                    <div className="scroll-button"></div>
                </ScrollToTop>
            </React.Fragment>
        );
    }
}

export default hot(module)(withNetworkRouter(App));
