import { configureChains, createClient } from "wagmi";
import { goerli, mainnet, polygonMumbai } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Accounts from "./WagmiComponents/Accounts";

import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { SendTransaction } from "./WagmiComponents/SendTransaction";
import ContractWrite2 from "./WagmiComponents/ContractWrite2";

const { chains, provider, webSocketProvider } = configureChains(
  [ goerli,mainnet,polygonMumbai],
  [
    alchemyProvider({ apiKey: "7WznFu_WlMBR0PykxkBrB7adCzGvynsj" }),
    publicProvider(),
  ]
);

export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "913d8ab765219b792fabcd140f23a3ab",
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
    
  ],
  provider,
  webSocketProvider,
});

function App() {
  return (
    <div className="App">
      <Accounts />
      <SendTransaction/>
      <ContractWrite2/>
    </div>
  );
}

export default App;
