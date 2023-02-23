interface Button {
	children: string;
	onClick?: () => void;
	className?: string;
	hoverable?: boolean;
	variant?: string;
	disabled?: boolean;
}

interface Variants {
	[key: string]: string;
	purple: string;
	red: string;
}

export default function Button({
	children,
	className,
	hoverable = true,
	variant = "purple",
	...rest
}: Button) {
	const variants: Variants = {
		purple: `text-white bg-indigo-600 ${
			hoverable && "hover:bg-indigo-700"
		}`,
		red: `text-white bg-red-600 ${hoverable && "hover:bg-red-700"}`,
	};

	return (
		<button
			{...rest}
			className={`disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 border rounded-md text-base font-medium ${className} ${variants[variant]}`}
		>
			{children}
		</button>
	);
}
