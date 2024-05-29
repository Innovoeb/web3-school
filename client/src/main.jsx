import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import { Networks } from './networks'

// (1) get a WalletConnect projectId via cloud.walletconnect.com
// import .env vars via Vite
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

// (3) Create a metadata object
const metadata = {
    name: 'Hello WalletConnect',
    description: 'My Website description',
    url: 'http://localhost:5173', // origin must match your domain & subdomain
    icons: ['']
}

// (4) Create Ethers config
const ethersConfig = defaultConfig({
    /*Required*/
    metadata
})

// (5) Create a Web3Modal instance
createWeb3Modal({
    ethersConfig,
    chains: [Networks.sepolia, Networks.polygon_amoy, Networks.arbitrum_sepolia, Networks.local_network],
    projectId
})
  


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
