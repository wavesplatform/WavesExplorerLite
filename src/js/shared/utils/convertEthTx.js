export const convertEthTx = (tx) => {
    const {id, sender, senderPublicKey, fee, feeAssetId, timestamp, height, applicationStatus, payload, proofs, version, chainId} = tx
    const commonFields = {
        id,
        sender,
        senderPublicKey,
        fee,
        feeAssetId,
        timestamp,
        height,
        applicationStatus,
        proofs: proofs || [],
        version,
        chainId
    }

    if (payload.type === 'invocation') {
        return {
            ...commonFields,
            type: 16,
            dApp: payload.dApp || '',
            version: payload.version || '',
            proofs: proofs || [],
            payment: payload.payment,
            call: payload.call,
            stateChanges: payload.stateChanges,
        }

    }

    if (payload.type === 'transfer') {
        return {
            ...commonFields,
            type: 4,
            recipient: payload.recipient,
            version: payload.version || '',
            assetId: payload.asset,
            amount: payload.amount,
            attachment: payload.attachment || '',
            call: payload.call,
        }
    }
}
