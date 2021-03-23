import React from 'react';
import PropTypes from 'prop-types';
import EndpointRef from '../../components/EndpointRef';
import {Line} from "../../pages/SingleBlockPage/TransactionListItem";


export class DappItem extends React.PureComponent {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            call: PropTypes.shape({
                function: PropTypes.string,
                args: PropTypes.arrayOf(PropTypes.shape({
                    type: PropTypes.string,
                    value: PropTypes.string
                }))
            }),
            dApp: PropTypes.string,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ])
        })).isRequired
    };

    render() {

        return (
            <div>
                <Line bold>
                    Invoke dApp
                </Line>
                <EndpointRef endpoint={this.props.data.dApp}/>
            </div>
        );
    }
}
