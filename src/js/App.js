import React from 'react';
import {BrowserRouter, Outlet, Route, Routes} from "react-router";

import '../styles/main.scss';
import ScrollToTop from 'react-scroll-up';

import {routeBuilder, routeParamsBuilder} from './shared/Routing';
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
import SingleLeasePage from './pages/SingleLeasePage';
import SingleAddressPage from './pages/SingleAddressPage';
import SingleAliasPage from './pages/SingleAliasPage';
import SingleAssetPage from './pages/SingleAssetPage';
import FaucetPage from './pages/FaucetPage'
import UnsupportedPage from './pages/UnsupportedPage';
import ConvertEthPage from './pages/ConvertEthPage';
import {withRouter} from "./withRouter";

const routeParams = routeParamsBuilder(ServiceFactory.global().configurationService().all());
const routes = routeBuilder(routeParams.networkId);

ServiceFactory.global().errorReportingService().initialize();
ServiceFactory.global().analyticsService().initialize();

class AppContainer extends React.Component {
    state = {
        mobileMenuVisible: null,
    };

    handleMobileMenuToggle = () => {
        this.setState({mobileMenuVisible: !this.state.mobileMenuVisible});
    };

    render() {
        const isVisible = this.state.mobileMenuVisible;
        const isAnimated = isVisible != null;
        let wrapperClassName = 'wrapper' + (isVisible ? ' show' : '') + (isAnimated ? ' animated' : '');

        return (
            <div>
                <div className={wrapperClassName}>
                    <Header onMenuToggle={this.handleMobileMenuToggle}>
                        <Search/>
                    </Header>
                    <NavBar/>
                    <div className="container grid">
                        <Outlet/>
                    </div>
                    <div className="fading" onClick={this.handleMobileMenuToggle}></div>
                </div>
                <div className="mobile-menu">
                    <Header onMenuToggle={this.handleMobileMenuToggle}/>
                    <NavBar appearance="mobile" onAfterNavigate={this.handleMobileMenuToggle}/>
                </div>
                <Tooltip id={TOOLTIP_ID}/>
                <ScrollToTop showUnder={100}>
                    <div className="scroll-button"></div>
                </ScrollToTop>
            </div>
        );
    }
}

const RoutedAppContainer = withRouter(AppContainer);

class App extends React.Component {
    state = {
        isBrowserSupported: true
    };

    componentDidMount() {
        const isBrowserSupported = ServiceFactory.global().browserService().isCurrentBrowserSupported();
        this.setState({isBrowserSupported});
    }

    componentDidCatch(error, errorInfo) {
        ServiceFactory
            .global()
            .errorReportingService()
            .captureComponentError(error, errorInfo);
    }

    render() {
        if (!this.state.isBrowserSupported) {
            return <UnsupportedPage/>;
        }

        return (
            <BrowserRouter basename={__BASE_PATH__}>
                <Routes>
                    <Route path={routes.root} element={<RoutedAppContainer/>}>
                        <Route index element={<MainPage/>}/>
                        <Route path={routes.blocks.one(routeParams.blockHeight)} element={<SingleBlockPage/>}/>
                        <Route path={routes.blocks.list} element={<BlocksPage/>}/>
                        <Route path={routes.transactions.one(routeParams.transactionId)}
                               element={<SingleTransactionPage/>}/>
                        <Route path={routes.leases.one(routeParams.leaseId)} element={<SingleLeasePage/>}/>
                        <Route path={routes.addresses.one(routeParams.address)} element={<SingleAddressPage/>}/>
                        <Route path={routes.addresses.one(routeParams.address, routeParams.tab)}
                               element={<SingleAddressPage/>}/>
                        <Route path={routes.aliases.one(routeParams.alias)} element={<SingleAliasPage/>}/>
                        <Route path={routes.assets.one(routeParams.assetId)} element={<SingleAssetPage/>}/>
                        <Route path={routes.nodes.list} element={<NodesPage/>}/>
                        <Route path={routes.peers.list} element={<PeersPage/>}/>
                        <Route path={routes.faucet} element={<FaucetPage/>}/>
                        <Route path={routes.converters} element={<ConvertEthPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
