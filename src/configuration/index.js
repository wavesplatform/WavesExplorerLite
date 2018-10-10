import Mainnet from './Mainnet';
import Testnet from './Testnet';

export const create = networkId => {
    if (Mainnet.networkId === networkId) {
        return Mainnet;
    } else if (Testnet.networkId === networkId) {
        return Testnet;
    } else {
        throw new Error(`Unsupported network id: ${networkId}`);
    }
};

export const networks = [Mainnet.networkId, Testnet.networkId];
