import React from 'react';
import PropTypes from 'prop-types';

import ServiceFactory from '../../services/ServiceFactory';
import Error, {ERROR_TYPES} from '../Error';
import {Loading} from './Loading.view';

const MAX_RETRIES = 2;
const RETRY_DELAY_MILLISECONDS = 5000;

export class Loader extends React.Component {
    static propTypes = {
        errorTitle: PropTypes.string,
        errorTitles: PropTypes.object,
        loadingTitle: PropTypes.string,
        fetchData: PropTypes.func.isRequired,
        shouldRetry: PropTypes.bool
    };

    state = {
        loading: false,
        hasError: false,
        errorType: undefined,
        retries: 0
    };

    timeoutId = null;

    componentDidMount() {
        this.setState({retries: 0});
        this.doFetch();
    }

    doFetch = () => {
        this.setState({loading: true});
        this.props.fetchData()
            .then(value => {
                this.setState({loading: false, hasError: false});

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

                if (this.props.shouldRetry && this.state.retries < MAX_RETRIES) {
                    this.removeInterval();
                    const nextRetries = this.state.retries + 1;
                    this.timeoutId = setTimeout(this.doFetch,
                        nextRetries * RETRY_DELAY_MILLISECONDS);
                    this.setState({retries: nextRetries});
                }
            });
    };

    componentWillUnmount() {
        this.removeInterval();
    }

    removeInterval = () => {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = 0;
        }
    };

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
