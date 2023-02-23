import { Hero } from "@/components/ui/common";
import { CourseList } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { getAllCourses } from "@/courses_content/fetcher";
import { ICourse } from "@/interfaces";

interface IHomeProps {
	courses: ICourse[];
}

export default function Home({ courses }: IHomeProps) {
	return (
		<>
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
