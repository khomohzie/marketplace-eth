import Web3 from "web3";
import { handler as createUseAccount } from "./useAccount";
import { MetaMaskEthereumProvider } from "@/interfaces";

export const setupHooks = (...deps: [Web3, MetaMaskEthereumProvider]) => {
	return {
		useAccount: createUseAccount(...deps),
	};
};
