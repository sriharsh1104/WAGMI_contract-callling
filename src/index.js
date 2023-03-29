import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { WagmiConfig } from "wagmi";
import { client } from "./App";
window.Buffer = require("buffer/").Buffer;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WagmiConfig client={client}>
    <App />
  </WagmiConfig>
);
