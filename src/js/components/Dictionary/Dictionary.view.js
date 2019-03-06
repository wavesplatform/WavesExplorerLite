import React from 'react';
import PropTypes from 'prop-types';

import DictionaryItem from '../DictionaryItem';

export class Dictionary extends React.Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape(DictionaryItem.propTypes)).isRequired
    };

    render() {
        return (
            <div className="dictionary">
                {this.props.items.map((item, index) => {
                    return <DictionaryItem key={index} {...item}/>
                })}
            </div>
        );
    }
}
