import mainnet from './config.mainnet';
import testnet from './config.testnet';
import devnet from './config.devnet';
import stagenet from './config.stagenet';

const configuredNetworks = [stagenet, mainnet, testnet, devnet]
    .filter(item => __NETWORKS__.includes(item.networkId));

export default configuredNetworks;
