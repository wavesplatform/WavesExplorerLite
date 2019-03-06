import React from 'react';
import PropTypes from 'prop-types';

const AliasLine = ({alias}) => {
    return (
        <div className="grid-item-fixed column-lg-6 column-4">
            <div className="line wide no-wrap">{alias}</div>
        </div>
    );
};

AliasLine.propTypes = {
    alias: PropTypes.string.isRequired
};

export class GroupedAliasListItem extends React.PureComponent {
    static propTypes = {
        aliasGroup: PropTypes.object.isRequired
    };

    render() {
        const group = this.props.aliasGroup;

        return (
            <tr>
                <td>
                    <div className="line">
                        <span className="bold">{group.letter}</span>
                    </div>
                </td>
                <td>
                    <div className="grid grid-wrap">
                        {group.aliases.map((alias, index) => {
                            return (<AliasLine key={index} alias={alias}/>);
                        })}
                    </div>
                </td>
            </tr>
        );
    }
}
