import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ScriptProps } from "next/script";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Page<P = Record<string, never>> = NextPage<P> & {
	Layout: (page: ScriptProps) => JSX.Element;
};

type Props = AppProps & {
	Component: Page;
};

const Noop = ({ children }: ScriptProps) => <>{children}</>;

const App = ({ Component, pageProps }: Props) => {
	const Layout = Component.Layout || Noop;

	return (
		<Layout>
			<ToastContainer theme="colored" />
			<Component {...pageProps} />
		</Layout>
	);
};

export default App;
