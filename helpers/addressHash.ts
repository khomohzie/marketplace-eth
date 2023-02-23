import BN from "bn.js";
import Web3 from "web3";

export default (address: string) => {
	const web3 = new Web3();

	const addressBytes = web3.utils.hexToBytes(address);

	const addressBN = new BN(addressBytes);

	const hash = web3.utils.soliditySha3({ t: "uint", v: addressBN });

	return hash;
};
