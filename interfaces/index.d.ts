export interface ICourse {
	id: string;
	type: string;
	title: string;
	description: string;
	coverImage: string;
	author: string;
	link: string;
	slug: string;
	wsl: string[];
	createdAt: string;
}

export interface MetaMaskEthereumProvider {
	isMetaMask?: boolean;
	once(eventName: string | symbol, listener: (...args: any[]) => void): this;
	on(eventName: string | symbol, listener: (...args: any[]) => void): this;
	off(eventName: string | symbol, listener: (...args: any[]) => void): this;
	addListener(
		eventName: string | symbol,
		listener: (...args: any[]) => void
	): this;
	removeListener(
		eventName: string | symbol,
		listener: (...args: any[]) => void
	): this;
	removeAllListeners(event?: string | symbol): this;
	request?: any;
}
