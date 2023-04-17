import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { useState } from "react";

function Wallet({ balance, setBalance }) {
  const [checkAddress, setCheckAddress] = useState("");
  async function onChange(evt) {
    const address = evt.target.value;
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Check Balances</h1>
      <label>
        Public key
        <input
          placeholder="Type your public key"
          value={address}
          onChange={onChange}
        ></input>
      </label>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
