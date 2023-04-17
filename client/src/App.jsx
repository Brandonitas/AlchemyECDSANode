import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  const [privateKey, setPrivateKey] = useState(
    "ae648f7e7c52e8dcf7e8ce28db878e1e88f42d9024588748b5beace9b8acf23a"
  );

  return (
    <div className="app">
      {/* <Wallet balance={balance} setBalance={setBalance} address={address} />*/}
      <Transfer
        setBalance={setBalance}
        balance={balance}
        address={address}
        setAddress={setAddress}
        privateKey={privateKey}
      />
    </div>
  );
}

export default App;
