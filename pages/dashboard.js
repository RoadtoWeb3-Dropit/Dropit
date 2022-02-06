import { useState } from "react"
import Link from "next/link"
import { ethers } from "ethers"
import Dropit from '../src/artifacts/contracts/Dropit.sol/Dropit.json'

// Initialize contract
const contractAddress = '0xf209FD3AfC255c2e3da59B3D5ba52293F2425538'
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const contract = new ethers.Contract(contractAddress, Dropit.abi, signer)

export default function Dashboard() {
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState(0)
  const [newMetadata, setNewMetadata] = useState('')

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        setAccount(accounts[0])
      } catch (err) {
        // TODO: Handle this with a toast
        console.log(err)
      }
    } else {
      // TODO: Throw error toast saying user does not have MetaMask
      console.log('No MetaMask detected')
    }
  }

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, newMetadata, {
      value: ethers.utils.parseEther('0.05'),
    });

    await result.wait();
    const check = await contract.isContentOwned(newMetadata)
    console.log(check)
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/">Home</Link>
      {account ?
        <>
          <p>Welcome</p>
          <p>Your balance is {balance} ETH</p>
          <input value={newMetadata} onChange={(e) => setNewMetadata(e.target.value)} />
          <button onClick={mintToken}>Mint token</button>
        </>
      :
        <button onClick={connectMetaMask}>Connect MetaMask</button>
      }
    </div>
  )
}
