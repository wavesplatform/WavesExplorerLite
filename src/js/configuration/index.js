import mainnet from './config.mainnet';
import testnet from './config.testnet';

const configuredNetworks = [mainnet, testnet]
    .filter(item => __NETWORKS__.includes(item.networkId));

export default configuredNetworks;
