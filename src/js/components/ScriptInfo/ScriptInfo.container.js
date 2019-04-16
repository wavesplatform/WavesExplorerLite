import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import {ScriptInfo} from './ScriptInfo.view';
import SelectList from '../SelectList';
import ServiceFactory from '../../services/ServiceFactory';

const JSON_FORMAT = 'json';
const BASE64_FORMAT = 'base64';

const options = [{
    option: JSON_FORMAT,
    value: 'JSON'
}, {
    option: BASE64_FORMAT,
    value: 'Base64'
}];

class ScriptInfoContainer extends React.Component {
    static propTypes = {
        script: PropTypes.string
    };

    state = {
        value: this.props.script
    };

    handleSelectedItemChanged = (selectedItem) => {
        if (selectedItem.option === BASE64_FORMAT) {
            this.setState({
                value: this.props.script
            });
        } else if (selectedItem.option === JSON_FORMAT) {
            const {networkId} = this.props.match.params;

            ServiceFactory
                .forNetwork(networkId)
                .addressService()
                .decompileScript(this.props.script)
                .then(decompiledScript => this.setState({value: decompiledScript}));
        }
    };

    render() {
        return (
            <React.Fragment>
                <ScriptInfo script={this.state.value} />
                <SelectList
                    items={options}
                    selectedItem={options[1]}
                    onSelectedItemChanged={this.handleSelectedItemChanged} />
            </React.Fragment>
        );
    }
}

export const RoutedScriptInfoContainer = withRouter(ScriptInfoContainer);

