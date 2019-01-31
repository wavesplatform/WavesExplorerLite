import mainnet from './config.mainnet';
import testnet from './config.testnet';
import devnet from './config.devnet';

const configuredNetworks = [mainnet, testnet, devnet]
    .filter(item => __NETWORKS__.includes(item.networkId));

export default configuredNetworks;
