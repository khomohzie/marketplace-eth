import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { IAccount, MetaMaskEthereumProvider } from "@/interfaces";
import { toast } from "react-toastify";
import { setupHooks } from "./hooks/setupHooks";

type TContextValue = {
	connect: () => void;
	getHooks: () => {
		useAccount: () => {
			account: IAccount;
		};
	};
	provider: MetaMaskEthereumProvider;
	web3: Web3;
	contract: null;
	isLoading: boolean;
	isWeb3Loaded: boolean;
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

	const _web3Api = useMemo(() => {
		const { web3, provider } = web3Api;

		return {
			...web3Api,
			isWeb3Loaded: web3 != null,
			getHooks: () => setupHooks(web3, provider),
			connect: provider
				? async () => {
						try {
							await provider.request({
								method: "eth_requestAccounts",
							});
						} catch (error) {
							location.reload();
						}
				  }
				: () => {
						console.log(
							"Cannot connect to Metamask! Try to reload your browser"
						);
						toast.error("Please install Metamask!");
				  },
		};
	}, [web3Api]);

	return (
		<Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
	);
}

export function useWeb3() {
	return useContext(Web3Context);
}

export function useHooks(
	cb: (
		hooks: ReturnType<
			() => {
				useAccount: () => {
					account: IAccount;
				};
			}
		>
	) => () => {
		account: IAccount;
	}
) {
	const { getHooks } = useWeb3()!;

	return cb(getHooks());
}
