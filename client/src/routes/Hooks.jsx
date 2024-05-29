import { 
    useWeb3Modal, 
    useWalletInfo, 
    useWeb3ModalAccount,
    useWeb3ModalProvider 
} from '@web3modal/ethers5/react'
import '../styles/Hooks.css'


const Hooks = () => {
    // 4. Use modal hook
    const { open } = useWeb3Modal()
    const { walletInfo } = useWalletInfo()
    const { address, chainId, isConnected } = useWeb3ModalAccount()



    return ( 
        <div className="hooks-content">
            <button onClick={() => open()}>Connect</button>
            <button onClick={() => open({ view: 'Networks' })}>Networks</button>
            <button onClick={() => open({ view: 'WhatIsAWallet' })}>Wallets</button>
            <button onClick={() => console.log(address, chainId, isConnected)}>Info</button>
        </div>
        
        
     )
}
 
export default Hooks;