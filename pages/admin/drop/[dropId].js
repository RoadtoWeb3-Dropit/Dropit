import { useRouter } from "next/router"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import Dropit from '../../../src/artifacts/contracts/Dropit.sol/Dropit.json'
import { CONTRACT_ADDRESS } from "../../../constants"

// Initialize contract
var provider;
var signer;
var contract;

export default function AdminDrop() {
  const router = useRouter()
  const { dropId } = router.query
  const [recipientWallets, setRecipientWallets] = useState([])
  const [metadataArray, setMetadataArray] = useState([])

  // On load, fetch all the addresses that are associated with the drop
  useEffect(() => {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
    contract = new ethers.Contract(CONTRACT_ADDRESS, Dropit.abi, signer)

    // TODO: connect db, dummy data for now
    setRecipientWallets([
      '0x5040d88fE39e2f4F706BfC5BB095229931AC7697',
      '0xaeE2344E979e2Fd48933F22934F1f991aF0d4B3C',
    ])
    setMetadataArray([
      '{name: "Three"}',
      '{name: "Four"}',
    ])
  }, [])

  const mintAndSend = async () => {
    const etherCost = recipientWallets.length * 0.05
    const result = await contract.payToMintBatch(recipientWallets, metadataArray, {
      value: ethers.utils.parseEther(`${etherCost}`),
    });
    await result.wait();
  }

  return (
    <div>
      <h1>{dropId}</h1>
      <Link href="/">Home</Link>
      <h2>Drop recipient addresses:</h2>
      {recipientWallets.map((wallet) =>
        <p key={wallet}>{wallet}</p>
      )}
      <button onClick={mintAndSend}>Send to recipients</button>
    </div>
  )
}
