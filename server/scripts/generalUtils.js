const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const verify = async (signature, message, publicKey) => {
  const messageHash = toHex(keccak256(utf8ToBytes(JSON.stringify(message))));
  const isSigned = await secp.verify(signature, messageHash, publicKey);
  return isSigned;
};

module.exports = verify;
