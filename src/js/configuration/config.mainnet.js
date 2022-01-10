const nodeUrl = 'https://nodes.wavesexplorer.com';

export default {
    networkId: 'mainnet',
    displayName: 'Mainnet',
    apiBaseUrl: nodeUrl,
    useCustomRequestConfig: true,
    dataServicesBaseUrl: 'https://api.wavesplatform.com/v0',
    spamListUrl: 'https://raw.githubusercontent.com/wavesplatform/waves-community/master/Scam%20tokens%20according%20to%20the%20opinion%20of%20Waves%20Community.csv',
    nodes: [{url: nodeUrl, maintainer: 'Waves'}],
    dapps: {
        '3PNikM6yp4NqcSU8guxQtmR5onr2D4e8yTJ': 'USDN Staking',
        '3PFhcMmEZoQTQ6ohA844c7C9M8ZJ18P8dDj': 'DeFo Staking',
        '3P7Uf5GF5feqnG39dTBEMqhGJzEq3T7MPUW': 'DeFo Swap',
        '3P6SFR9ZZwKHZw5mMDZxpXHEhg1CXjBb51y': 'LP Staking',
        '3PLDtdSudp3ao5WWU4EzXC6D7TQm7t3dSWC': 'ALP conservative Staking',
        '3PKaRXj6pBb23A8k965eEgBAhhJ4FSDKS5e': 'ALP moderate Staking',
        '3PDepwsPLPmFTGQM3H51jbR9b5522eM9kth': 'ALP aggressive Staking',
        '3P3hCvE9ZfeMnZE6kXzR6YBzxhxM8J6PE7K': 'Lambo Staking',
        '3PPNhHYkkEy13gRWDCaruQyhNbX2GrjYSyV': 'WX Liquidity Pools',
        '3P8KMyAJCPWNcyedqrmymxaeWonvmkhGauz': 'WX Liquidity Pools',
        '3PKpsc1TNquw4HAF62pWK8ka1DBz9vyEBkt': 'WX IDO',
        '3PAZv9tgK1PX7dKR7b4kchq5qdpUS3G5sYT': 'Vires.Finance',
        '3P73HDkPqG15nLXevjCbmXtazHYTZbpPoPw': 'SWOP.FI ',
        '3PPH7x7iqobW5ziyiRCic19rQqKr6nPYaK1': 'SWOP.FI',
        '3P27S9V36kw2McjWRZ37AxTx8iwkd7HXw6W': 'SWOP.FI',
        '3PLHVWCqA9DJPDbadUofTohnCULLauiDWhS': 'SWOP.FI',
        '3PJQUUiJdvz9etUKED9ju7o7VrcNMtnkXBU': 'EGG Swap'
    }
};
