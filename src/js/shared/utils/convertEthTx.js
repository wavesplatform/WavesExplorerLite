export const convertEthTx = (tx) => {
    const {id, sender, senderPublicKey, fee, feeAssetId, timestamp, height, applicationStatus, payload, proofs, version, chainId, bytes} = tx
    const commonFields = {
        id,
        sender,
        senderPublicKey,
        fee,
        feeAssetId,
        timestamp,
        height,
        applicationStatus,
        version,
        chainId,
        bytes
    }

    if (!!payload) {
        return {
            ...commonFields,
            type: 16,
            dApp: '',
            version,
            proofs: proofs || [],
            payment: [],
            call: '',
            stateChanges: {},
            isEthereum: true,
        }
    }

    if (payload.type === 'invocation') {
        return {
            ...commonFields,
            type: 16,
            dApp: payload.dApp || '',
            version,
            proofs: proofs || [],
            payment: payload.payment,
            call: payload.call,
            stateChanges: payload.stateChanges,
            isEthereum: true,
        }

    }

    if (payload.type === 'transfer') {
        return {
            ...commonFields,
            type: 4,
            recipient: payload.recipient,
            version,
            assetId: payload.asset,
            amount: payload.amount,
            call: payload.call,
            isEthereum: true
        }
    }
}
