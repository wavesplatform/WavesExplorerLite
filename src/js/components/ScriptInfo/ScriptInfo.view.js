import React from 'react';
import PropTypes from 'prop-types';

import EmptyData from '../EmptyData';
import SelectList from '../SelectList';

const EmptyScript = () => (
    <div className='data-container empty'>
        <EmptyData />
    </div>
);

export class ScriptInfo extends React.PureComponent {
    static propTypes = {
        script: PropTypes.string
    };

    render() {
        const isEmpty = !this.props.script;
        if (isEmpty)
            return <EmptyScript />;

        return (
            <div className="data-container">
                <pre>{this.props.script}</pre>
            </div>
        );
    }
}
