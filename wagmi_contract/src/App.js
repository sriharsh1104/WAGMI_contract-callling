import "./App.css";
import { useConnect, useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useEffect, useState } from "react";
import ABI from "./abi.json";
import useDebounce from "./useDebounce";

function App() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const [sendAmount, setSendAmount] = useState(0);
  const [receiver, setReceiver] = useState("");
  const debouncedSendAmount = useDebounce(sendAmount, 500);
  const debouncedReceiver = useDebounce(receiver, 500);
  const { config } = usePrepareContractWrite({
    address: '0x127460d11DFCF3be3FeBf3c8C03B9C4f0E4B6749', 
    abi: ABI,
    chainId: 5,
    functionName: 'transfer(address,uint256)',
    args: [debouncedReceiver, debouncedSendAmount],
    enabled: Boolean(debouncedSendAmount)
  })

  const { write } = useContractWrite(config)

  function changeSendAmount(e){
    setSendAmount(e.target.value)
  }

  function changeReceiver(e){
    setReceiver(e.target.value)
  }

  useEffect(() => {
    if (!isConnected) {
      setReceiver("");
      setSendAmount(0);
      return;
    }

  }, [isConnected, address]);

  return (
    <div className="App">
      <h1>TOKEN TRANSFER WITH WAGMI</h1>
      {!isConnected ? (
        <button onClick={connect}>Connect Your Wallet</button>
      ) : (
        <>
          <h2>Connected Wallet:</h2>
          <h3>{address}</h3>
          <input type="number" value={sendAmount} onChange={changeSendAmount} placeholder="Enter amount" />
          <br/>
          <input type="text" value={receiver} onChange={changeReceiver} placeholder="Enter recipient" />
          <br/>
          <button disabled={!write} onClick={()=>write?.()}>Send</button>
        </>
      )}
    </div>
  );
}

export default App;
