import React from 'react';
import {ConverterItem} from './ConverterItem';
import {ethAddress2waves, wavesAddress2eth, wavesAsset2Eth} from '@waves/node-api-js'
import {getNetworkByte} from '../../shared/utils'
import ServiceFactory from '../../services/ServiceFactory';

const labels = {
    WAVES: 'WAVES',
    ETHEREUM: 'ETHEREUM'
}

export class ConvertEthPage extends React.Component {
    state = {
        address: '',
        asset: '',
    };

    convertW2EAddress = (value) => wavesAddress2eth(value)
    convertE2WAddress = (value) => ethAddress2waves(value, getNetworkByte(this.props.match.params.networkId))

    convertW2EAsset = (value) => wavesAsset2Eth(value)
    convertE2WAsset = async (value) => await ServiceFactory.forNetwork(this.props.match.params.networkId).assetService().convertEth2Waves(value)

    render() {
        return (
            <div className="loaderWrapper">
                <div className="content card">
                    <div className="converter">
                        <div className="converter-title">
                            Address
                        </div>
                        <ConverterItem title={labels.WAVES} convertedTitle={labels.ETHEREUM}
                                       handleConvert={this.convertW2EAddress}/>
                        <ConverterItem title={labels.ETHEREUM} convertedTitle={labels.WAVES}
                                       handleConvert={this.convertE2WAddress}/>
                    </div>
                    <div className="converter">
                        <div className="converter-title">
                            Asset
                        </div>
                        <ConverterItem title={labels.WAVES} convertedTitle={labels.ETHEREUM}
                                       handleConvert={this.convertW2EAsset}/>
                        <ConverterItem title={labels.ETHEREUM} convertedTitle={labels.WAVES}
                                       handleConvert={this.convertE2WAsset}/>
                    </div>
                </div>
            </div>
        );
    }
}
