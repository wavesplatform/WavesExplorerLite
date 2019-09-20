import React from 'react';
import PropTypes from 'prop-types';

import ServiceFactory from '../../services/ServiceFactory';
import Error, {ERROR_TYPES} from '../Error';
import {Loading} from './Loading.view';

export class Loader extends React.Component {
    static propTypes = {
        errorTitle: PropTypes.string,
        errorTitles: PropTypes.object,
        loadingTitle: PropTypes.string,
        fetchData: PropTypes.func.isRequired
    };

    state = {
        loading: false,
        hasError: false,
        errorType: undefined
    };

    componentDidMount() {
        this.setState({loading: true});
        this.props.fetchData()
            .then(value => {
                this.setState({loading: false});

                return value;
            })
            .catch(error => {
                console.log(error);

                let errorType = ERROR_TYPES.GENERIC;
                if (error.response && error.response.status) {
                    switch (error.response.status) {
                        case 404:
                            errorType = ERROR_TYPES.NOT_FOUND;
                            break;
                    }
                }

                ServiceFactory
                    .global()
                    .errorReportingService()
                    .captureException(error);

                this.setState({
                    loading: false,
                    hasError: true,
                    errorType
                });
            });
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }

        if (this.state.hasError) {
            const title = this.props.errorTitles[this.state.errorType] || this.props.errorTitle;
            return <Error title={title} type={this.state.errorType} />;
        }

        return this.props.children;
    }
}
