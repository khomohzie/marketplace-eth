import { Web3Provider } from "@/components/providers";
import { Navbar, Footer } from "@components/ui/common";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export default function BaseLayout({ children }: Props) {
	return (
		<Web3Provider>
			<div className="max-w-7xl mx-auto px-4">
				<Navbar />

				<div className="fit">{children}</div>
			</div>

			<Footer />
		</Web3Provider>
	);
}
