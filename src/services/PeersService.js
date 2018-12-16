import {ApiClientService} from './ApiClientService';

export class PeersService extends ApiClientService {
    constructor(configurationService) {
        super(configurationService);
    }

    loadPeers = () => {
        return this.getApi().peers().then(response => {
            return response.data.peers.map(item => ({
                address: item.address,
                declaredAddress: item.declaredAddress,
                name: item.peerName,
                nonce: item.peerNonce
            }));
        });
    };
}
