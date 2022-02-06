import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
} from "../../../../pages/interact";
import styles from "./minter.module.css";
import {
  VStack,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Select,
  Input,
  HStack,
  Text,
} from "@chakra-ui/react";

const Minter = (props) => {
  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [nftUrl, setNftURL] = useState("");

  const [dropName, setDropName] = useState("");
  const [dropDesc, setDropDesc] = useState("");
  const [dropType, setDropType] = useState("");

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

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

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { status } = await mintNFT(url, name, description);
    setStatus(status);
  };

  return (
    <VStack>
      <HStack>
        <Container maxW="container.lg">
          <FormControl isRequired>
            <h1>Create a new drop here!</h1>
            <FormLabel htmlFor="drop-name">Drop Name</FormLabel>

            <Input
              id="drop-name"
              placeholder="Enter drop name"
              onChange={(event) => setDropName(event.target.value)}
            />

            <FormLabel htmlFor="drop-desc">Drop Description</FormLabel>

            <Input
              id="drop-desc"
              placeholder="Enter drop desciption"
              onChange={(event) => setDropDesc(event.target.value)}
            />

            <FormLabel htmlFor="drop-type">Drop Type</FormLabel>
            <Select
              id="droptype"
              defaultValue="Controlled"
              onChange={(event) => setDropType(event.target.value)}
            >
              <option>Controlled</option>
              <option>Instant</option>
            </Select>
            <Button mt={4} colorScheme="blue" type="submit">
              Create
            </Button>
          </FormControl>
          <h1>
            {dropName}
            <br />
            {dropDesc}
            <br />
            {dropType}
          </h1>
        </Container>

        <Container maxW="container.lg">
          <FormControl isRequired>
            <h1>Create an NFT for your drop!</h1>
            <FormLabel htmlFor="nftname">NFT Name</FormLabel>

            <Input
              id="nftname"
              placeholder="🤔 Name:"
              onChange={(event) => setNftName(event.target.value)}
            />

            <FormLabel htmlFor="nft-desc">NFT Description</FormLabel>

            <Input
              id="nft-desc"
              placeholder="✍️ Description:"
              onChange={(event) => setNftDescription(event.target.value)}
            />

            <FormLabel htmlFor="nft-link">NFT Link to Asset</FormLabel>
            <Input
              id="nft-url"
              placeholder="🖼 Link to asset:"
              onChange={(event) => setNftURL(event.target.value)}
            />
            <Button mt={4} colorScheme="blue" type="submit">
              Create
            </Button>
          </FormControl>
          <h1>
            {nftName}
            <br />
            {nftDescription}
            <br />
            {nftUrl}
          </h1>
        </Container>
      </HStack>
    </VStack>
  );
};

export default Minter;
