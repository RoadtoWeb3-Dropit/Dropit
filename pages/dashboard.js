
import { useState, useEffect } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import Dropit from "../src/artifacts/contracts/Dropit.sol/Dropit.json";
import Minter from "../src/components/admin/mint-interface/Minter";
import Drops from "../src/components/admin/drop-interface/Drops";
import { connectWallet, getCurrentWalletConnected } from "./interact.js";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Box,
  Button,
} from "@chakra-ui/react";
import { CONTRACT_ADDRESS } from '../constants'

// Initialize contract
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const contract = new ethers.Contract(CONTRACT_ADDRESS, Dropit.abi, signer)


export default function Dashboard() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [newMetadata, setNewMetadata] = useState("");

  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }
  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, newMetadata, {
      value: ethers.utils.parseEther("0.05"),
    });

    await result.wait();
    const check = await contract.isContentOwned(newMetadata);
    console.log(check);
  };

  return (
    <VStack position="absolute" height="100%" width="100%">
      <Box>
        <Button id="walletButton" onClick={connectWalletPressed}>
          {walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </Button>
        <Tabs>
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Minter></Minter>
            </TabPanel>
            <TabPanel>
              <Drops wallet={walletAddress}/>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
        {/* <h1>Dashboard</h1>
      <Link href="/">Home</Link> */}
        {/* {account ? (
        <>
          <p>Welcome</p>
          <p>Your balance is {balance} ETH</p>
          <input
            value={newMetadata}
            onChange={(e) => setNewMetadata(e.target.value)}
          />
          <button onClick={mintToken}>Mint token</button>
        </>
      ) : (
        <button onClick={connectMetaMask}>Connect MetaMask</button>

      )} */}
        {/* <Link href="/admin">Admin</Link> */}
      </Box>
    </VStack>
  );
}
