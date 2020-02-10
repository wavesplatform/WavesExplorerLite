import React from 'react';
import PropTypes from 'prop-types';

export class ToolListItem extends React.Component {
    static propTypes = {
        tool: PropTypes.object.isRequired
    };

    render() {
        const {tool} = this.props;
        return (
            <tr>
                <td data-label="Name">
                    <div className="line no-wrap"><a href={tool.url} target="_blank">{tool.name}</a></div>
                </td>
                <td data-label="Maintainer">
                    <div className="line">{tool.maintainer}</div>
                </td>
            </tr>
        );
    }
}
