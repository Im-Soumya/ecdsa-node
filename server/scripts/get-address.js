const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKeys = require("../utils/private-key");

let privateKey;

for (let index = 0; index < privateKeys.length; index++) {
  privateKey = privateKeys[index];
  const publicKey = secp.getPublicKey(privateKey);
  const keyHash = keccak256(publicKey.slice(1));
  const walletAddress = keyHash.slice(-20);
  console.log(`0x${toHex(walletAddress)}`);
}
