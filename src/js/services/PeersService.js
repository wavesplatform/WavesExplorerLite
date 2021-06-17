import {ApiClientService} from './ApiClientService';

export class PeersService extends ApiClientService {
    constructor(configurationService, networkId) {
        super(configurationService, networkId);
    }

    loadPeers = () => {
        return this.getApi().peers().then(response => {
            return response.peers.map(item => ({
                address: item.address,
                declaredAddress: item.declaredAddress,
                name: item.peerName,
                nonce: item.peerNonce
            }));
        });
    };
}
