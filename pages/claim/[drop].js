import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { ethers } from "ethers";
import { connectWallet, getCurrentWalletConnected } from "../interact";
import Dropit from '../../src/artifacts/contracts/Dropit.sol/Dropit.json'
import { CONTRACT_ADDRESS } from "../../constants";
import {
  Button,
  Flex,
  Heading,
  useToast,
} from "@chakra-ui/react"

// Initialize contract
var provider;
var signer;
var contract;

export default function Home() {
  const router = useRouter()
  const { drop } = router.query
  const toast = useToast()
  const [wallet, setWallet] = useState('')
  const [loading, setLoading] = useState(false)

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
    try {
      setLoading(true);
      const result = await contract.payToMint(wallet, metadata, {
        value: ethers.utils.parseEther("0"),
      });
  
      await result.wait();
      setLoading(false);
      toast({
        title: 'NFT sent!',
        description: 'Congrats :)',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (err) {
      setLoading(false);
      toast({
        title: 'We ran into an error :(',
        description: err?.data?.message || 'Please try again later!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  };
  
  return (
    <Flex
      align="center"
      direction="column"
      justify="center"
      height="100vh"
    >
      <Heading textAlign="center" size="md">Claim your drop for</Heading>
      <Heading textAlign="center">{drop}</Heading>
      <Flex gap="20px" mt="3">
        <Button onClick={connectWalletPressed}>
          {wallet.length > 0 ? (
            "Connected: " +
            String(wallet).substring(0, 6) +
            "..." +
            String(wallet).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </Button>
        <Button onClick={claim} isLoading={loading}>Claim</Button>
      </Flex>
    </Flex>
  )
}
