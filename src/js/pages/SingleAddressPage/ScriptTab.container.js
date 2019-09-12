import React from 'react';
import {withRouter} from 'react-router';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import ScriptInfo from '../../components/ScriptInfo';

class ScriptTabContainer extends React.Component {
    state = {
        script: {}
    };

    fetchData = () => {
        const {address, networkId} = this.props.match.params;
        const addressService = ServiceFactory.forNetwork(networkId).addressService();

        return addressService.loadScript(address).then(script => this.setState({script}));
    };

    render() {
        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to load script">
                <ScriptInfo script={this.state.script.script} />
            </Loader>
        );
    }
}

const RoutedScriptTabContainer = withRouter(ScriptTabContainer);

export default RoutedScriptTabContainer;
