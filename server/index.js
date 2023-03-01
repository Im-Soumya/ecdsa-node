const express = require("express");
const app = express();
const cors = require("cors");
const secp = require("ethereum-cryptography/secp256k1");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0xc4222e9f1a987105fd072dc1bc46abd98793964e": 100, // Alice
  "0x4f1e1dcf3e2d944900ef745b3c77d340de7bb1e8": 50, // James
  "0x741370d6b51a4e39670944a39c33edce2cbe673f": 75, // Ben
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, hashTx, signature, recoveryBit } =
    req.body;

  // const publicKey = secp.recoverPublicKey(hashTx, signature, recoveryBit);
  // console.log(publicKey);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
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
