import { Modal } from "@/components/ui/common";
import { CourseHero, Curriculum, Keypoints } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { getAllCourses } from "@/courses_content/fetcher";
import { ICourse } from "@interfaces/index";

type TCourseProps = { course: ICourse };

export default function Course({ course }: TCourseProps) {
	return (
		<>
			<div className="py-4">
				<CourseHero
					title={course.title}
					description={course.description}
					image={course.coverImage}
				/>
			</div>

			<Keypoints points={course.wsl} />

			<Curriculum locked={true} />

			<Modal />
		</>
	);
}

export function getStaticPaths() {
	const { data } = getAllCourses();

	return {
		paths: data.map((c) => ({
			params: {
				slug: c.slug,
			},
		})),
		fallback: false,
	};
}

type TParams = {
	params: {
		slug: string;
	};
};

export function getStaticProps({ params }: TParams) {
	const { data } = getAllCourses();

	const course = data.filter((c) => c.slug === params.slug)[0];

	return {
		props: { course },
	};
}

Course.Layout = BaseLayout;
