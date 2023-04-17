import { useState } from "react";
import server from "./server";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sign } from "./utils/generalUtils";

import { toHex } from "ethereum-cryptography/utils";

function Transfer({ address, setAddress, setBalance, balance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const notifySuccess = () => toast.success("Success transfer");
  const notifyErrorAuth = () => toast.error("Error (not permission)");
  const notifyError = (message) => toast.error(`Error: ${message}`);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function onChangePublicKey(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  async function transfer(evt) {
    evt.preventDefault();

    const message = { amount: parseInt(sendAmount), recipient };
    const { signature, recoveryBit } = await sign(message, privateKey);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        message,
        signature: toHex(signature),
        recoveryBit,
      });
      setBalance(balance);
      notifySuccess();
    } catch (ex) {
      if (ex.response.status === 401) {
        notifyErrorAuth();
      } else {
        notifyError(ex.response.data.message);
      }
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <div>Account public key:</div>
      <div style={{ fontSize: "12px", marginBottom: "12px" }}>
        031ce2ef102ee03dfaf75d6c26dd053d09372317aa733970fa619d92e6d05883cc
      </div>

      <div>Other accounts public key:</div>
      <div style={{ fontSize: "12px" }}>
        03b00df5e2cd6ceeb910e4dceb7c5e4f443e4cfc9a5dd3196d00c53ac272bc0e26
      </div>
      <div style={{ fontSize: "12px", marginBottom: "12px" }}>
        0367d204ce1e79e4f0fb70422be5ac0419b8b52bd6e2861f03383f81991ab5fc64
      </div>

      <label>
        Sender public key
        <input
          placeholder="Type your public key"
          value={address}
          onChange={onChangePublicKey}
        ></input>
      </label>
      <div style={{ fontSize: "12px", marginBottom: "12px" }}>
        Current balance: {balance}
      </div>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
      <ToastContainer />
    </form>
  );
}

export default Transfer;
