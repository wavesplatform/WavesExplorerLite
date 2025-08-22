import React from 'react';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import DataInfo from '../../components/DataInfo';
import {withRouter} from "../../withRouter";

class DataTabContainer extends React.Component {
    state = {
        data: []
    };

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    fetchData = () => {
        const {address, networkId} = this.props.params;
        const addressService = ServiceFactory.forNetwork(networkId).addressService();

        return addressService.loadData(address).then(data => this._isMounted && this.setState({data}));
    };

    render() {
        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to load address data">
                <DataInfo data={this.state.data}/>
            </Loader>
        );
    }
}

export default withRouter(DataTabContainer);
