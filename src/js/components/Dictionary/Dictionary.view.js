import React from 'react';

import Headline, {HeadlineSize} from '../Headline';
import DictionaryItem from '../DictionaryItem';

const DictionaryItemSection = ({section, items}) => (
    <React.Fragment>
        {section !== 'default' && <Headline title={section} size={HeadlineSize.Medium} copyVisible={false}/>}
        {items.map((item, index) => {
            return <DictionaryItem key={index} {...item}/>
        })}
    </React.Fragment>
);

export class Dictionary extends React.Component {
    render() {
        return (
            <div className="dictionary">
                {Object.keys(this.props.items).map((key, index) => {
                    return <DictionaryItemSection key={index} section={key} items={this.props.items[key]} />
                })}
            </div>
        );
    }
}
