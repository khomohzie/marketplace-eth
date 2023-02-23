import { useEffect } from "react";
import Web3 from "web3";
import useSWR from "swr";
import { IAccount, MetaMaskEthereumProvider } from "@/interfaces";
import addressHash from "@/helpers/addressHash";

const adminAddresses: {
	[key: string]: string;
	address: string;
} = {
	address: addressHash(process.env.NEXT_PUBLIC_ADDRESS)!,
};

export const handler =
	(
		web3: Web3,
		provider: MetaMaskEthereumProvider
	): (() => {
		account: IAccount;
	}) =>
	() => {
		const { data, mutate, ...rest } = useSWR(
			() => {
				return web3 ? "web3/accounts" : null;
			},
			async () => {
				const accounts = await web3.eth.getAccounts();

				return accounts[0];
			}
		);

		useEffect(() => {
			provider &&
				provider.on("accountsChanged", (accounts: Array<string>) =>
					mutate(accounts[0] ?? null)
				);
		}, [provider]);

		return {
			account: {
				data,
				isAdmin:
					data && addressHash(data) === adminAddresses.address
						? true
						: false,
				mutate,
				...rest,
			},
		};
	};
