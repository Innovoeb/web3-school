import { useWeb3Modal, useWalletInfo } from '@web3modal/ethers5/react'
import '../styles/Hooks.css'


const Hooks = () => {
    // 4. Use modal hook
    const { open } = useWeb3Modal()
    const { walletInfo } = useWalletInfo()

    const logAddress = () => {
        console.log(`Address: ${address}`)
        console.log(`Connected: ${isConnected}`)
    }


    return ( 
        <div className="hooks-content">
            <button onClick={() => open()}>Connect</button>
            <button onClick={() => open({ view: 'Networks' })}>Networks</button>
            <button onClick={() => open({ view: 'WhatIsAWallet' })}>Wallets</button>
            <button onClick={() => console.log(walletInfo.name, walletInfo.icon)}>Info</button>
        </div>
        
        
     )
}
 
export default Hooks;