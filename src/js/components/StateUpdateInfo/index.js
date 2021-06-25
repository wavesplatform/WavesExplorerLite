import React from 'react';
import {Line} from "../../pages/SingleBlockPage/TransactionListItem";
import MoneyInfo from "../MoneyInfo";
import TransactionArrow from "../TransactionArrow";
import EndpointRef from "../EndpointRef";
import LeaseRef from '../LeaseRef';

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

export const StateUpdateInfo = ({tx}) => {
    const data = !!tx.stateUpdate ? tx.stateUpdate : tx.stateChanges
    return <table className='state-update'>
        <tbody>
        {data.transfers && data.transfers
            .map(({address, money, sender}, i) => <tr key={i}>
                <td style={{width: 100}}><Line bold>Transfer</Line></td>
                <td><MoneyInfo key={i} value={money}/></td>
                <td>
                    {sender && <TransactionArrow type={4} direction={'incoming'}/>}
                    {sender && <Line wrap={false}>
                        <EndpointRef endpoint={sender} appearance="regular"/>
                    </Line>}
                    {address && <Line wrap={false}>
                        <EndpointRef endpoint={address} appearance="regular"/>
                    </Line>}
                </td>
            </tr>)
        }
        </tbody>

        <tbody>
        {data.issues && data.issues
            .map((item, i) => <tr key={i}>
                <td style={{width: 100}}>
                    <Line wrap={false} bold>
                        Issue
                    </Line>
                    {item.address && <Line wrap={false}>
                        <EndpointRef endpoint={item.address} appearance="regular"/>
                    </Line>}
                </td>
                <td><MoneyInfo key={i} value={item.money}/></td>
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
        {data.reissues && data.reissues
            .map((item, i) => <tr key={i}>
                <td style={{width: 100}}>
                    <Line wrap={false} bold>
                        Reissue
                    </Line>
                    {item.address && <Line wrap={false}>
                        <EndpointRef endpoint={item.address} appearance="regular"/>
                    </Line>}
                </td>
                <td><MoneyInfo key={i} value={item.money}/></td>
                <td>
                    <Line wrap={false}>
                        {`Reissuable: ${item.isReissuable}`}
                    </Line>
                </td>
            </tr>)
        }
        </tbody>

        <tbody>
        {data.burns && data.burns
            .map((item, i) => <tr key={i}>
                <td style={{width: 100}}>
                    <Line wrap={false} bold>
                        Burn
                    </Line>
                    {item.address && <Line wrap={false}>
                        <EndpointRef endpoint={item.address} appearance="regular"/>
                    </Line>}
                </td>
                <td style={{verticalAlign: 'middle'}}>
                    <MoneyInfo key={i} value={item.money}/>
                </td>
                <td></td>
            </tr>)
        }
        </tbody>

        <tbody>
        {data.sponsorFees && data.sponsorFees
            .map((item, i) => <tr key={i}>
                <td style={{width: 100}}>
                    <Line wrap={false} bold>
                        SponsorFee
                    </Line>
                    {item.address && <Line wrap={false}>
                        <EndpointRef endpoint={item.address} appearance="regular"/>
                    </Line>}
                </td>
                <td style={{verticalAlign: 'middle'}}>
                    <MoneyInfo key={i} value={item.money}/>
                </td>
                <td></td>
            </tr>)
        }
        </tbody>

        <tbody>
        {data.leases && data.leases
            .map((item, i) => <tr key={i}>
                <td style={{width: 100}}>
                    <Line wrap={false} bold>
                        Lease
                    </Line>
                    <Line wrap={false}>
                        <LeaseRef leaseId={item.id}/>
                    </Line>
                </td>
                <td style={{verticalAlign: 'middle'}}>
                    {item.amount}
                </td>
                <td>
                    {item.sender && <TransactionArrow type={4} direction={'incoming'}/>}
                    {item.sender && <Line wrap={false}>
                        <EndpointRef endpoint={item.sender} appearance="regular"/>
                    </Line>}
                    {item.recipient && <Line wrap={false}>
                        <EndpointRef endpoint={item.recipient} appearance="regular"/>
                    </Line>}
                </td>
            </tr>)
        }
        </tbody>

        <tbody>
        {data.leaseCancels && data.leaseCancels
            .map((item, i) => <tr key={i}>
                <td style={{width: 100}}>
                    <Line wrap={false} bold>
                        LeaseCancel
                    </Line>
                    <Line wrap={false}>
                        <LeaseRef leaseId={item.id}/>
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
        {data.data && data.data
            .map((data, i) => <tr key={i}>
                <td style={{width: 100}}><Line bold>{getDataEntryType(data.type) || 'Delete value'}</Line></td>
                <td>{`key: ${data.key}`}</td>
                <td>{`value: ${data.value}`}</td>
            </tr>)
        }
        </tbody>
    </table>
};
