import React from 'react';
import PropTypes from 'prop-types';

import {ToolListItem} from './ToolListItem.view';

export class ToolList extends React.Component {
    static propTypes = {
        tools: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    render() {
        return (
            <table className="nodes table-sm-transform">
                <thead>
                    <tr>
                        <th className="name">Tool</th>
                        <th className="maintainer">Maintainer</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.tools.map((tool, index) => {
                        return (<ToolListItem key={index} tool={tool} />);
                    })}
                </tbody>
            </table>
        );
    }
}
