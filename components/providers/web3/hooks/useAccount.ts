import Web3 from "web3";

export const handler =
	(web3: Web3): (() => { account: string | null }) =>
	() => {
		return {
			account: web3 ? "Test Account" : null,
		};
	};
