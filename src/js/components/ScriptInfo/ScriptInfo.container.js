import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { BASE64_FORMAT, DECOMPILED_FORMAT, ScriptInfoView } from './ScriptInfo.view';
import ServiceFactory from '../../services/ServiceFactory';

class ScriptInfoContainer extends React.Component {
    static propTypes = {
        script: PropTypes.string
    };

    constructor(props) {
        super(props)
        this.state = {
            value: ''
        };
        this.setDecompiledScript();
    }


    componentDidUpdate(prevProps) {
        if (this.props.script !== prevProps.script) {
            this.setState({value: this.props.script});
        }
    }

    handleDisplayFormatChanged = (format) => {
        if (format === BASE64_FORMAT) {
            this.setState({value: this.props.script});
        } else if (format === DECOMPILED_FORMAT) {
            this.setDecompiledScript()
        }
    };

    setDecompiledScript = () => {
        const {networkId} = this.props.match.params;
        this.props.script && ServiceFactory
            .forNetwork(networkId)
            .addressService()
            .decompileScript(this.props.script)
            .then(decompiledScript => this.setState({value: decompiledScript}));
    };

    render() {
        return <ScriptInfoView script={this.state.value} onDisplayFormatChanged={this.handleDisplayFormatChanged}/>;
    }
}

export const RoutedScriptInfoContainer = withRouter(ScriptInfoContainer);

