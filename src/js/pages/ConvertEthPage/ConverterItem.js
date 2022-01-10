import React, {useState} from 'react';

export function ConverterItem(props) {
    const [wavesValue, setWavesValue] = useState('');
    const [ethValue, setEthValue] = useState('');
    let isLoading = false;

    const convertWaves = async () => {
        if (!!wavesValue.length) {
            const val = await props.convertW2E(wavesValue)
            setEthValue(val)
        }
    }

    const convertEth = async () => {
        if (!!ethValue.length) {
            if (props.convertE2W(ethValue).hasOwnProperty('then')) {
                isLoading = true
                console.log('isLoading')
            }
            const val = await props.convertE2W(ethValue)
            setWavesValue(val)
        }
    }

    const handleKeyPress = (e, handler) => {
        if (e.key === 'Enter') handler()
    }

    return <div className="converter">
        <div className="converter-title">
            {props.title}
        </div>
            <div className="converter-wrapper">
                <div className="converter-input">
                    <input className="converter-input-field"
                           value={wavesValue}
                           onChange={(e) => setWavesValue(e.target.value)}
                           onKeyPress={e => handleKeyPress(e, convertWaves)}/>
                    <div className="converter-waves-title">
                        WAVES
                    </div>
                </div>
                <div className="converter-arrows"/>
                <div className="converter-input">
                    <input className="converter-input-field"
                           value={ethValue}
                           onChange={(e) => setEthValue(e.target.value)}
                           onKeyPress={e => handleKeyPress(e, convertEth)}/>
                    <div className="converter-ethereum-title">
                        ETHEREUM
                    </div>
                </div>
                <div className="converter-button">
                    <div className="converter-button-icon"/>
                    Convert
                </div>
            </div>
    </div>
}
