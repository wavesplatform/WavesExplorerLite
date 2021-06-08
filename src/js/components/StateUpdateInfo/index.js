import React from 'react';
import {Line} from "../../pages/SingleBlockPage/TransactionListItem";
import MoneyInfo from "../MoneyInfo";
import TransactionArrow from "../TransactionArrow";
import EndpointRef from "../EndpointRef";
import {RoutedAssetRef} from "../AssetRef/AssetRef.view";
import TransactionRef from "../TransactionRef";

const getDataEntryType = (type) => {
    switch (type) {
        case "binary":
            return "BinaryEntry";
        case "integer":
            return "IntegerEntry";
        case "string":
            return "StringEntry";
        case "boolean":
            return "BooleanEntry";
        default:
            return "DeleteEntry"
    }
}

export const StateUpdateInfo = ({tx}) => (
    <table className='state-update'>
        <tbody>
        {tx.stateUpdate.transfers && tx.stateUpdate.transfers
            .map(({address, money, sender}, i) => <tr key={i}>
                <td style={{width: 100}}><Line bold>Transfer</Line></td>
                <td><MoneyInfo key={i} value={money}/></td>
                <td>
                    <TransactionArrow type={4} direction={'incoming'}/>
                    <Line wrap={false}>
                        <EndpointRef endpoint={sender} appearance="regular"/>
                    </Line>
                    <Line wrap={false}>
                        <EndpointRef endpoint={address} appearance="regular"/>
                    </Line>
                </td>
            </tr>)
        }
        </tbody>

        <tbody>
        {tx.stateUpdate.issues && tx.stateUpdate.issues
            .map((item, i) => <tr key={i}>
                <td style={{width: 100}}>
                    <Line wrap={false} bold>
                        Issue
                    </Line>
                    <Line wrap={false}>
                        <EndpointRef endpoint={item.address} appearance="regular"/>
                    </Line>
                </td>
                <td>{`${item.quantity}`}</td>
                <td>
                    <Line wrap={false}>
                        {`Description: ${item.description}`}
                    </Line>
                    <Line wrap={false}>
                        {`Reissuable: ${item.isReissuable}`}
                    </Line>
                    <Line wrap={false}>
                        {`Script: ${item.compiledScript}`}
                    </Line>
                </td>
            </tr>)
        }
        </tbody>

        <tbody>
        {tx.stateUpdate.reissues && tx.stateUpdate.reissues
            .map((item, i) => <tr key={i}>
                <td style={{width: 100}}>
                    <Line wrap={false} bold>
                        Reissue
                    </Line>
                    <Line wrap={false}>
                        <EndpointRef endpoint={item.address} appearance="regular"/>
                    </Line>
                </td>
                <td>{`${item.quantity}`}</td>
                <td>
                    <Line wrap={false}>
                        {`Reissuable: ${item.isReissuable}`}
                    </Line>
                </td>
            </tr>)
        }
        </tbody>

        <tbody>
        {tx.stateUpdate.burns && tx.stateUpdate.burns
            .map((item, i) => <tr key={i}>
                <td style={{width: 100}}>
                    <Line wrap={false} bold>
                        Burn
                    </Line>
                    <Line wrap={false}>
                        <EndpointRef endpoint={item.address} appearance="regular"/>
                    </Line>
                </td>
                <td style={{verticalAlign: 'middle'}}>
                    {`${item.quantity} `}
                    <RoutedAssetRef assetId={item.assetId} text={item.money.currency.displayName}/>
                </td>
                <td></td>
            </tr>)
        }
        </tbody>

        <tbody>
        {tx.stateUpdate.sponsorFees && tx.stateUpdate.sponsorFees
            .map((item, i) => <tr key={i}>
                <td style={{width: 100}}>
                    {console.log('SponsorFee', item)}
                    <Line wrap={false} bold>
                        SponsorFee
                    </Line>
                    <Line wrap={false}>
                        <EndpointRef endpoint={item.address} appearance="regular"/>
                    </Line>
                </td>
                <td style={{verticalAlign: 'middle'}}>
                    {`${item.money.amount} `}
                    <RoutedAssetRef assetId={item.assetId} text={item.money.currency.displayName}/>
                </td>
                <td></td>
            </tr>)
        }
        </tbody>

        <tbody>
        {tx.stateUpdate.leases && tx.stateUpdate.leases
            .map((item, i) => <tr key={i}>
                <td style={{width: 100}}>
                    <Line wrap={false} bold>
                        Lease
                    </Line>
                    <Line wrap={false}>
                        <TransactionRef txId={item.leaseId}/>
                    </Line>
                </td>
                <td style={{verticalAlign: 'middle'}}>
                    {item.amount}
                </td>
                <td>
                    <TransactionArrow type={4} direction={'incoming'}/>
                    <Line wrap={false}>
                        <EndpointRef endpoint={item.sender} appearance="regular"/>
                    </Line>
                    <Line wrap={false}>
                        <EndpointRef endpoint={item.recipient} appearance="regular"/>
                    </Line>
                </td>
            </tr>)
        }
        </tbody>

        <tbody>
        {tx.stateUpdate.leaseCancels && tx.stateUpdate.leaseCancels
            .map((item, i) => <tr key={i}>
                <td style={{width: 100}}>
                    <Line wrap={false} bold>
                        LeaseCancel
                    </Line>
                    <Line wrap={false}>
                        <TransactionRef txId={item.leaseId}/>
                    </Line>
                </td>
                <td style={{verticalAlign: 'middle'}}>
                    {item.amount}
                </td>
                <td>
                    <Line wrap={false}>
                        <EndpointRef endpoint={item.address} appearance="regular"/>
                    </Line>
                </td>
            </tr>)
        }
        </tbody>

        <tbody>
        {tx.stateUpdate.data && tx.stateUpdate.data
            .map((data, i) => <tr key={i}>
                <td style={{width: 100}}><Line bold>{getDataEntryType(data.type) || 'Delete value'}</Line></td>
                <td>{`key: ${data.key}`}</td>
                <td>{`value: ${data.value}`}</td>
            </tr>)
        }
        </tbody>
    </table>
);
