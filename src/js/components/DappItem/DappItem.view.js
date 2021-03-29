import React from 'react';
import PropTypes from 'prop-types';
import EndpointRef from '../../components/EndpointRef';
import {Line} from "../../pages/SingleBlockPage/TransactionListItem";
import '../../../styles/dapp-item.scss';

export class DappItem extends React.PureComponent {
    state = {isOpen: false};

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
            <div className='dapp'>
                <div className='dapp-invoke'>
                    <Line bold>
                        Invoke dApp
                    </Line>
                    <EndpointRef endpoint={this.props.data.dApp}/>
                </div>
                <div className='dapp-call'>
                    <div>
                        Call
                    </div>
                    <div className='dapp-call-function'>
                        <div>
                            {this.props.data.call.function}
                        </div>
                        (
                        <div className='dapp-call-function-arguments'>
                            {`${this.props.data.call.args.map(x => {
                                if (x.type === 'String') {
                                    return `"${x.value}"`
                                } else {
                                    return x.value
                                }
                            }).join(', ')}`}
                        </div>
                        )
                    </div>
                </div>
                {this.props.data.payments && <div className='dapp-payments'>
                    {console.log('payments', this.props.data.payments)}
                    {this.props.data.payments.map(x => x).join(', ')}
                </div>}
                {console.log('state', this.state)}
                <div className='dapp-button' onClick={() => this.setState((state) => ({isOpen: !state.isOpen}))}>
                    {this.state.isOpen
                        ? 'Hide actions'
                        : 'Show actions'}
                </div>
            </div>
        );
    }
}
