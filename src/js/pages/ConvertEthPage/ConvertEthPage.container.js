import React from 'react';
import {ConverterItem} from './ConverterItem';
import {ethAddress2waves, wavesAddress2eth, wavesAsset2Eth} from '@waves/node-api-js'
import {getNetworkByte} from '../../shared/utils'
import ServiceFactory from '../../services/ServiceFactory';

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
                    <ConverterItem title={"Address"} convertW2E={this.convertW2EAddress} convertE2W={this.convertE2WAddress}/>
                    <ConverterItem title={"Asset"} convertW2E={this.convertW2EAsset} convertE2W={this.convertE2WAsset}/>
                </div>
            </div>
        );
    }
}
