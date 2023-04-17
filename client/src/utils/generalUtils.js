import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";

export const sign = async (message, privateKey) => {
  const messageHash = toHex(keccak256(utf8ToBytes(JSON.stringify(message))));
  const [signature, recoveryBit] = await secp.sign(messageHash, privateKey, {
    recovered: true,
  });
  return { signature, recoveryBit };
};
