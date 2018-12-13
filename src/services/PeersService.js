import {api} from '../shared/NodeApi';

export class PeersService {
    loadPeers = () => {
        return api.peers().then(response => {
            return response.data.peers.map(item => ({
                address: item.address,
                declaredAddress: item.declaredAddress,
                name: item.peerName,
                nonce: item.peerNonce
            }));
        });
    };
}
