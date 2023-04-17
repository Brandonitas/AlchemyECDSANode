const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp256k1.utils.randomPrivateKey();

console.log("PRIVATE KEY", toHex(privateKey));

const publicKey = secp256k1.getPublicKey(privateKey);

console.log("PUBLIC KEY", toHex(publicKey));
