import { CourseList } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { getAllCourses } from "@/courses_content/fetcher";
import { WalletBar } from "@/components/ui/web3";
import { ICourse } from "@/interfaces";
import { useAccount } from "@/components/hooks/web3";

interface IMarketplaceProps {
	courses: ICourse[];
}

export default function Marketplace({ courses }: IMarketplaceProps) {
	const { account } = useAccount();

	return (
		<>
			<div className="py-4">
				<WalletBar address={account.data!} />
			</div>

			<CourseList courses={courses} />
		</>
	);
}

export function getStaticProps() {
	const { data } = getAllCourses();

	return {
		props: { courses: data },
	};
}

Marketplace.Layout = BaseLayout;
