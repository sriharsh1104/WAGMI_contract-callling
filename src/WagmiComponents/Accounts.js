import React from "react";
import {
  Connector,
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";

const Accounts = () => {
  const { connectAsync, connectors } = useConnect();
  const { address, connector, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data, isError, isLoading } = useBalance({
    address: address,
    // token:"0x3cd71b6a70F9A5920ED6154e580ef8A34429cbEd"
  });
  const { chain } = useNetwork();
  const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork();
  console.log("Connectorssss", connector);

  const handleWalletConnect = async (connector) => {
    const { account, chain } = await connectAsync({ connector });
  };
  console.log(data, isError, isLoading);

  const handleDisconnect = () => {
    disconnect();
  };
  return (
    <>
      <h1>Wagmi Demo</h1>
      {!isConnected && <h4>Connect your wallet</h4>}
      {isConnected && (
        <div>
          <h4>{address}</h4>
          <h5>Your balance is {data?.formatted} ETH</h5>
        </div>
      )}
      {!isConnected &&
        connectors.map((connector) => {
          const { id, name } = connector;
          return (
            <button onClick={() => handleWalletConnect(connector)} key={id}>
              {name}
            </button>
          );
        })}
      {isConnected && <button onClick={handleDisconnect}>Disconnect</button>}

      {chain && <div>Connected to {chain.name}</div>}

      <h3>Switch Network</h3>
      {chains.map((x) => (
        <button
          disabled={!switchNetwork || x.id === chain?.id}
          key={x.id}
          onClick={() => switchNetwork?.(x.id)}
        >
          {x.name}
          {isLoading && pendingChainId === x.id && " (switching)"}
        </button>
      ))}

      <div>{error && error.message}</div>
    </>
  );
};

export default Accounts;
