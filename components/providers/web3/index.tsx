import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { MetaMaskEthereumProvider } from "@/types";

type TContextValue = {
	provider: MetaMaskEthereumProvider;
	web3: Web3;
	contract: null;
	isLoading: boolean;
};

const Web3Context = createContext<null | TContextValue>(null);

export default function Web3Provider({ children }: { children: ReactNode }) {
	const [web3Api, setWeb3Api] = useState({
		provider: null as unknown as MetaMaskEthereumProvider,
		web3: null as unknown as Web3,
		contract: null,
		isLoading: true,
	});

	useEffect(() => {
		const loadProvider = async () => {
			const provider = await detectEthereumProvider();

			if (provider) {
				const web3 = new Web3(provider as any);

				setWeb3Api({
					provider,
					web3,
					contract: null,
					isLoading: false,
				});
			} else {
				setWeb3Api((api) => ({ ...api, isLoading: false }));
				console.error("Please install MetaMask!");
			}
		};

		loadProvider();
	}, []);

	return (
		<Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
	);
}

export function useWeb3() {
	return useContext(Web3Context);
}
