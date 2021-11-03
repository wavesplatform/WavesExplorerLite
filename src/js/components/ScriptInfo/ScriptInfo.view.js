import React from 'react';
import PropTypes from 'prop-types';

import EmptyData from '../EmptyData';
import SelectList from '../SelectList';
import CopyButton from '../CopyButton';

export const DECOMPILED_FORMAT = 'decompiled';
export const BASE64_FORMAT = 'base64';

const options = [{
    option: DECOMPILED_FORMAT,
    value: 'Decompiled'
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
                        selectedItem={options[0]}
                        onSelectedItemChanged={this.handleSelectedItemChanged} />

                    <CopyButton className={'btn-link'} text={script} />
                </div>
            </React.Fragment>
        );
    }
}
