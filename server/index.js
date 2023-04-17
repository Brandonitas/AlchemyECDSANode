const express = require("express");
const app = express();
const cors = require("cors");
const recoverKey = require("./scripts/generalUtils");
const verify = require("./scripts/generalUtils");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "031ce2ef102ee03dfaf75d6c26dd053d09372317aa733970fa619d92e6d05883cc": 100,
  "03b00df5e2cd6ceeb910e4dceb7c5e4f443e4cfc9a5dd3196d00c53ac272bc0e26": 50,
  "0367d204ce1e79e4f0fb70422be5ac0419b8b52bd6e2861f03383f81991ab5fc64": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { sender, message, signature, recoveryBit } = req.body;
  const { recipient, amount } = message;

  const isValid = await verify(signature, message, sender);

  if (!isValid) {
    res.status(401).send({ message: "Not your public key" });
  } else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    setInitialBalance(sender);
    setInitialBalance(recipient);
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
