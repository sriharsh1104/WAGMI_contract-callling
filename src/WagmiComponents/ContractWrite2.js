import React, { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import useDebounce from "../useDebounce";
import ABI from "../abi.json";
const ContractWrite2 = () => {
  const [receiver, setReceiver] = useState("");
  const [sendAmount, setSendAmount] = useState();
  const debouncedReceiver = useDebounce(receiver, 500);
  const debouncedSendAmount = useDebounce(sendAmount, 500);
  const { config } = usePrepareContractWrite({
    address: "0x3cd71b6a70F9A5920ED6154e580ef8A34429cbEd",
    abi: ABI,
    chainId: 5,
    functionName: "transfer(address,uint256)",
    args: [debouncedReceiver, debouncedSendAmount],
    enabled: Boolean(debouncedSendAmount),
  });

  const { write } = useContractWrite(config);

  const changeReceiver = (e) => {
    setReceiver(e.target.value);
  };

  const changeSendAmount = (e) => {
    setSendAmount(e.target.value);
  };

  return (
    <div>
      <h3>Send Transaction from contract</h3>
      <input
        type="text"
        value={receiver}
        onChange={changeReceiver}
        placeholder="Enter recipient"
      />
      <br />
      <input
        type="number"
        value={sendAmount}
        onChange={changeSendAmount}
        placeholder="Enter amount"
      />
      <br />

      <button onClick={() => write?.()}>Send</button>
    </div>
  );
};

export default ContractWrite2;
