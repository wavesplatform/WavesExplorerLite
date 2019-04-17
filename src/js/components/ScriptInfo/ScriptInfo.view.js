import React from 'react';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';

import EmptyData from '../EmptyData';
import SelectList from '../SelectList';

export const JSON_FORMAT = 'json';
export const BASE64_FORMAT = 'base64';

const options = [{
    option: JSON_FORMAT,
    value: 'JSON'
}, {
    option: BASE64_FORMAT,
    value: 'Base64'
}];

const EmptyScript = () => (
    <div className='data-container empty'>
        <EmptyData />
    </div>
);

export class ScriptInfoView extends React.PureComponent {
    static propTypes = {
        script: PropTypes.string,
        onDisplayFormatChanged: PropTypes.func.isRequired
    };

    handleSelectedItemChanged = (selectedItem) => {
        this.props.onDisplayFormatChanged(selectedItem.option);
    };

    render() {
        const {script} = this.props;

        const isEmpty = !script;
        if (isEmpty)
            return <EmptyScript />;

        return (
            <React.Fragment>
                <div className="data-container">
                    <pre>{script}</pre>
                </div>
                <div className="data-container-tools">
                    <SelectList
                        items={options}
                        selectedItem={options[1]}
                        onSelectedItemChanged={this.handleSelectedItemChanged} />

                    <CopyToClipboard text={script}>
                        <a>Copy</a>
                    </CopyToClipboard>
                </div>
            </React.Fragment>
        );
    }
}
