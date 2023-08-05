import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function Block({ block }) {
  if (block === undefined) {
    return null;
  }

  return (
    <div>
      Hash: {block.hash}
      <br />
      Parent Hash: {block.parentHash}
      <br />
      Number: {block.number}
      <br />
      Timestamp: {block.timestamp}
      <br />
      Nonce: {block.nonce}
    </div>
  );
}

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();

    const interval = setInterval(getBlockNumber, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function getBlock(blockNumber) {
      setBlock(await alchemy.core.getBlock(blockNumber));
    }

    getBlock(blockNumber);
  }, [blockNumber]);

  return (
    <div className="App">
      Block Number: {blockNumber}
      <Block block={block} />
    </div>
  );
}

export default App;
