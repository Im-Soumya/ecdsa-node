import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

import server from "./server";
import { useState } from "react";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  const [walletAddress, setWalletAddress] = useState("");

  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    const address = secp.getPublicKey(privateKey);
    setAddress(toHex(address));

    const keyHash = keccak256(address.slice(1));
    const walletAddress = (`0x${toHex(keyHash.slice(-20))}`);
    setWalletAddress(walletAddress);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${walletAddress}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key:
        <input placeholder="Type an address, for example: 0x1" value={privateKey} onChange={onChange}></input>
      </label>

      {address && <div>Address: {walletAddress}</div>}

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
