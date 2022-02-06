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
import { ethers } from "ethers";
import Dropit from "../../../artifacts//contracts/Dropit.sol/Dropit.json";
import { CONTRACT_ADDRESS } from "../../../../constants";

const Minter = (props) => {
  //State variables
  const provider = "";
  const signer = "";
  const contract = "";

  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [newMetadata, setNewMetadata] = useState({});

  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [nftUrl, setNftURL] = useState("");

  const [dropName, setDropName] = useState("");
  const [dropDesc, setDropDesc] = useState("");
  const [dropType, setDropType] = useState("");

  if (walletAddress) {
    // Initialize contract
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, Dropit.abi, signer);
  }
  const uploadToDataBase = () => {
    // logic to add wallet addr to db
    // logic to add following info to db

    /*
    DB:
    name: Drop name
    desc: Drop desc
    recWallets: [String]
    metada: {
      name:
      desc:
      imgLink:
    }
    */

    const newMetadata = {
      dropName: { dropName },
      dropDesc: { dropDesc },
      dropType: { dropType },
      nftName: { nftName },
      nftDescription: { nftDescription },
      nftUrl: { nftUrl },
    };

    console.log(newMetadata);
  };

  const mintToken = async () => {
    const newMetadata = {
      dropName: { dropName },
      dropDesc: { dropDesc },
      dropType: { dropType },
      nftName: { nftName },
      nftDescription: { nftDescription },
      nftUrl: { nftUrl },
    };

    const connection = contract.connect(signer);
    const addr = walletAddress;
    const result = await contract.payToMint(addr, newNFTMetadata, {
      value: ethers.utils.parseEther("0.05"),
    });

    await result.wait();
    const check = await contract.isContentOwned(newMetadata);
    console.log(check);
  };

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);

    addWalletListener();
  }, []);

  function addWalletListener() {
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
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  return (
    <VStack>
      <FormControl isRequired>
        <HStack>
          <Container maxW="container.lg">
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

            <h1>
              {dropName}
              <br />
              {dropDesc}
              <br />
              {dropType}
            </h1>
          </Container>

          <Container maxW="container.lg">
            <br />
            <br />
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

            <Button
              mt={4}
              colorScheme="blue"
              type="submit"
              onClick={uploadToDataBase}
            >
              Create NFT Drop
            </Button>

            <h1>
              {nftName}
              <br />
              {nftDescription}
              <br />
              {nftUrl}
            </h1>
          </Container>
          <h1>
            {walletAddress ? (
              ""
            ) : (
              <p>
                {" "}
                🦊{" "}
                <a target="_blank" href={`https://metamask.io/download.html`}>
                  You must install Metamask, a virtual Ethereum wallet, in your
                  browser. Once installed, click the connect button on the top
                  of the page!
                </a>
              </p>
            )}
          </h1>
        </HStack>
      </FormControl>
    </VStack>
  );
};

export default Minter;
