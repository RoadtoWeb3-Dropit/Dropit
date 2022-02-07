import { useState, useEffect } from "react";
import Link from "next/link";

import Minter from "../src/components/admin/mint-interface/Minter";
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

export default function Dashboard() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);

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
          setStatus("🦊 Connected to Metamask.");
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
              <p>two!</p>
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
