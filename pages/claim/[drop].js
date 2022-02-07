import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { ethers } from "ethers";
import { connectWallet, getCurrentWalletConnected } from "../interact";
import Dropit from '../../src/artifacts/contracts/Dropit.sol/Dropit.json'
import { CONTRACT_ADDRESS } from "../../constants";
import {
  Button
} from "@chakra-ui/react"

// Initialize contract
var provider;
var signer;
var contract;

export default function Home() {
  const router = useRouter()
  const { drop } = router.query
  const [wallet, setWallet] = useState('')

  // TODO: Get drop metadata from API, dummy data for now
  const metadata = JSON.stringify({
    drop: `${drop}`
  })

  // Initialization
  useEffect(() => {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
    contract = new ethers.Contract(CONTRACT_ADDRESS, Dropit.abi, signer)

    const getWallet = async () => {
      const { address } = await getCurrentWalletConnected();
      return address;
    }

    setWallet(getWallet());
    addWalletListener();
  }, []);

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
        }
      });
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
  };

  const claim = async () => {
    const result = await contract.payToMint(wallet, metadata, {
      value: ethers.utils.parseEther("0"),
    });

    await result.wait();
    const check = await contract.isContentOwned(metadata);
    console.log(check ? 'NFT was claimed!' : 'NFT is not claimed :(');
  };
  
  return (
    <div>
      <Button id="walletButton" onClick={connectWalletPressed}>
        {wallet.length > 0 ? (
          "Connected: " +
          String(wallet).substring(0, 6) +
          "..." +
          String(wallet).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </Button>
      <h1>Claim your drop for {drop}</h1>
      <button onClick={claim}>Claim</button>
      <Link href="/">Home</Link>
    </div>
  )
}
