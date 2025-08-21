import React from 'react';
import PropTypes from 'prop-types';

import {BASE64_FORMAT, DECOMPILED_FORMAT, ScriptInfoView} from './ScriptInfo.view';
import ServiceFactory from '../../services/ServiceFactory';
import {decompile} from "@waves/ride-js";
import {withRouter} from "../../withRouter";

class ScriptInfoContainer extends React.Component {
    static propTypes = {
        script: PropTypes.string
    };

    constructor(props) {
        super(props)
        this.state = {
            value: ''
        };
    }

    componentDidMount() {
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
        if (this.props.script) {
            try {
                const decompilationResult = decompile(this.props.script);
                const decompiledScript = !decompilationResult.error ? decompilationResult.result : decompilationResult.error;
                this.setState({value: decompiledScript});
            } catch (e) {
                console.error('Decompilation error:', e)
                this.setState({value: 'Decompilation error'});
            }
        }
    };

    render() {
        return <ScriptInfoView script={this.state.value} onDisplayFormatChanged={this.handleDisplayFormatChanged}/>;
    }
}

export const RoutedScriptInfoContainer = withRouter(ScriptInfoContainer);

