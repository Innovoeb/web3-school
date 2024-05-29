
const INFURA_API_KEY = import.meta.env.RPC_KEY



export const Networks = {
    sepolia: {
        chainId: 11155111,
        name: 'Sepolia',
        currency: 'ETH',
        explorerUrl: 'https://sepolia.etherscan.io/',
        rpcUrl: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`
    },
    polygon_amoy: {
        chainId: 80002,
        name: 'Polygon Amoy',
        currency: 'MATIC',
        explorerUrl: 'https://amoy.polygonscan.com/',
        rpcUrl: `https://polygon-amoy.infura.io/v3/${INFURA_API_KEY}`
    },
    arbitrum_sepolia: {
        chainId: 421614,
        name: 'Arbitrum Sepolia',
        currency: 'ETH',
        explorerUrl: 'https://sepolia.arbiscan.io/',
        rpcUrl: `https://arbitrum-sepolia.infura.io/v3/${INFURA_API_KEY}`
    },
    local_network: {
        chainId: 31337,
        name: 'Local Network',
        currency: 'ETH',
        explorerUrl: '',
        rpcUrl: 'http://127.0.0.1:8545'
    }

}