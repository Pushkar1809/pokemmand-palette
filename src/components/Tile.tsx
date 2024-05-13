import { PropsWithChildren } from "react";
import { cn } from "../utils/cn";

interface Props {
	onClick?: () => void;
	className?: string;
	isSelected?: boolean;
}

const Tile = ({
	onClick = () => {},
  className = "",
	children,
	isSelected = false
}: PropsWithChildren<Props>) => {
	return (
		<div
			onClick={onClick}
			className={cn(
				`min-w-[25ch] px-5 py-3 rounded-md ${isSelected ? "bg-blue-600" : "bg-white/10"} text-white cursor-pointer ring-0 hover:ring-2 ring-blue-600 transition-all ease-in-out duration-200 flex justify-between items-center`,
        className
			)}>
			{children}
		</div>
	);
};

export default Tile;
