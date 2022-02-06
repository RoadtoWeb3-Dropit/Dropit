# Dropit

## To run tests:
```bash
npx hardhat test
```

## To run a network locally:
```bash
npx hardhat node
```
This will create a local network and return a list of burner wallets that you can connect to and use in MetaMask. In a separate terminal you can now compile the contract by running:
```bash
npx hardhat compile
```
With this done, we can finally deploy the contract to the local network with:
```bash
npx hardhat run scripts/sample-script.js --network localhost
```

## To start the frontend app:
```bash
yarn dev
```
Then visit [http://localhost:3000](http://localhost:3000) to see it.
