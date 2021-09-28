export const getNetworkByte = (id) => {
    let byte
    switch (id) {
        case 'testnet':
            byte = 'T'.charCodeAt()
            break;
        case 'mainnet':
            byte = 'W'.charCodeAt()
            break;
        case 'stagenet':
            byte = 'S'.charCodeAt()
            break;
        case 'custom':
            byte = 'D'.charCodeAt()
            break;
        default:
            byte = 'S'.charCodeAt()
    }
    return byte
}
