import React from 'react';

import Pagination from './Pagination';
import BlockList from './BlockList';

export default class BlocksPage extends React.Component {
    render() {
        const blocks = [{
            height: 1000001,
            date: '00.00.0000',
            time: '00:00:00',
            baseTarget: 1000,
            generator: '3P7GQo48n1SM7EZXnmNBRMcD5oDwKXf8SSm',
            signature: '2JmNzyk5XpGLhGT3Z55Rh2j3a15XpGLhGT3Z55Rh2j3a1',
            transactions: 100
        }, {
            height: 1000002,
            date: '00.00.0000',
            time: '00:00:00',
            baseTarget: 1000,
            generator: '3P7GQo48n1SM7EZXnmNBRMcD5oDwKXf8SSm',
            signature: '2JmNzyk5XpGLhGT3Z55Rh2j3a15XpGLhGT3Z55Rh2j3a1',
            transactions: 100
        }, {
            height: 1000003,
            date: '00.00.0000',
            time: '00:00:00',
            baseTarget: 1000,
            generator: '3P7GQo48n1SM7EZXnmNBRMcD5oDwKXf8SSm',
            signature: '2JmNzyk5XpGLhGT3Z55Rh2j3a15XpGLhGT3Z55Rh2j3a1',
            transactions: 100
        }, {
            height: 1000004,
            date: '00.00.0000',
            time: '00:00:00',
            baseTarget: 1000,
            generator: '3P7GQo48n1SM7EZXnmNBRMcD5oDwKXf8SSm',
            signature: '2JmNzyk5XpGLhGT3Z55Rh2j3a15XpGLhGT3Z55Rh2j3a1',
            transactions: 100
        }];

        return (
            <React.Fragment>
                <div className="headline">
                    <span className="title">Blocks</span>
                    <Pagination />
                </div>
                <BlockList blocks={blocks} networkId={this.props.match.params.networkId} />
            </React.Fragment>
        );
    }
}
