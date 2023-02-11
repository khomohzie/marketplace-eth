import { useWeb3 } from "@/components/providers";
import { Hero } from "@/components/ui/common";
import { CourseList } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { getAllCourses } from "@/courses_content/fetcher";
import { ICourse } from "@/interfaces";
import { toast } from "react-toastify";

interface IHomeProps {
	courses: ICourse[];
}

export default function Home({ courses }: IHomeProps) {
	const data = useWeb3();

	console.log(data?.web3);

	return (
		<>
			{data?.isLoading
				? "IS LOADING Web3"
				: data?.web3
				? "Web3 Ready!"
				: `Please install MetaMask! ${toast.error(
						"Please install MetaMask!"
				  )}`}

			<Hero />

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

Home.Layout = BaseLayout;
