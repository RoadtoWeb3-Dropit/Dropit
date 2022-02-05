import { useState } from "react"
import Link from "next/link"

export default function Dashboard() {
  const [account, setAccount] = useState('')

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

  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/">Home</Link>
      {account ?
        <button onClick={connectMetaMask}>Connect MetaMask</button>
      :
        <p>Welcome</p>
      }
    </div>
  )
}
