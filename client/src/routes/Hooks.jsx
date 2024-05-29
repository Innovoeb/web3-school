import { 
    useWeb3Modal, 
    useWalletInfo, 
    useWeb3ModalAccount,
    useWeb3ModalProvider 
} from '@web3modal/ethers5/react'
import { ethers } from "ethers"
import '../styles/Hooks.css'


const Hooks = () => {
    // 4. Use modal hook
    const { open } = useWeb3Modal()
    const { walletInfo } = useWalletInfo()
    const { walletProvider } = useWeb3ModalProvider()
    const { address, chainId, isConnected } = useWeb3ModalAccount()
    const localWallet = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

    const getBalance = async () => {
        if (!isConnected) throw Error('User disconnected')

        const provider = new ethers.providers.Web3Provider(walletProvider)
        
        const balance = await provider.getBalance(localWallet)
        console.log(`Balance: ${ethers.utils.formatEther(balance)}`)
    }

    return ( 
        <div className="hooks-content">
            <button onClick={() => open()}>Connect</button>
            <button onClick={() => open({ view: 'Networks' })}>Networks</button>
            <button onClick={() => open({ view: 'WhatIsAWallet' })}>Wallets</button>
            <button onClick={() => console.log(address, chainId, isConnected)}>Info</button>
            <button onClick={getBalance}>Balance</button>
        </div>
        
        
     )
}
 
export default Hooks;