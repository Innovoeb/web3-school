import '../styles/Contracts.css'
import Header from '../components/Header'
import { useState } from 'react'
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { ethers } from "ethers"
import { Simple } from '../abis/SimpleABIs.js'


const Contracts = () => {
    const [value, setValue] = useState(0)
    const [ethvalue, setEthValue] = useState('')
    const { walletProvider } = useWeb3ModalProvider()
    const { isConnected } = useWeb3ModalAccount()

    const getNumber = async () => {
        if (!isConnected) throw Error('User disconnected')

        const provider = new ethers.providers.Web3Provider(walletProvider)
        const signer = provider.getSigner()
        

        // contract obj
        const contract = new ethers.Contract(Simple.simplestorageAddress, Simple.simplestorageABI, provider)
        const number = await contract.number()  
        console.log(`Number: ${number.toString()}`) 
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleEthChange = (e) => {
        setEthValue(e.target.value)
    }

    const setNumber = async () => {
        if (!isConnected) throw Error('User disconnected')

        const provider = new ethers.providers.Web3Provider(walletProvider)
        const signer = provider.getSigner()
        

        // contract obj
        const contract = new ethers.Contract(Simple.simplestorageAddress, Simple.simplestorageABI, signer)
        const tx = await contract.store(value)
        console.log(`Transaction hash: ${tx.hash}`)
    }

    const pay = async () => {
        if (!isConnected) throw Error('User disconnected')

        const provider = new ethers.providers.Web3Provider(walletProvider)
        const signer = provider.getSigner()
        

        // contract obj
        const contract = new ethers.Contract(Simple.simplepayableAddress, Simple.simplepayableABI, signer)
        const tx = await contract.pay({value: ethers.utils.parseEther(ethvalue)})
        console.log(`Transaction hash: ${tx.hash}`)
    }

    const getBalance = async () => {
        if (!isConnected) throw Error('User disconnected')

        const provider = new ethers.providers.Web3Provider(walletProvider)
        

        // contract obj
        const contract = new ethers.Contract(Simple.simplepayableAddress, Simple.simplepayableABI, provider)
        //const balance = await contract.balance()  
        const balance = await provider.getBalance(Simple.simplepayableAddress)
        console.log(`Balance: ${ethers.utils.formatEther(balance)}`) 
    }


    return (
        <>
            <Header />
            <div className="contracts-content">
                <button onClick={getNumber}>Read</button>
                <div className="divider"></div>
                <input type="number" value={value} onChange={handleChange}/>
                <button onClick={setNumber}>Write</button>
                <div className="divider"></div>
                <input type="text" value={ethvalue} onChange={handleEthChange}/>
                <button id="pay" onClick={pay}>Pay</button>
                <button onClick={getBalance}>Balance</button>
            </div> 
        </> 
        
    )
}
 
export default Contracts