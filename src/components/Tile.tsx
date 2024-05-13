import { PropsWithChildren } from "react";
import { cn } from "../utils/cn";

interface Props {
	onClick: () => void;
	className?: string;
	isSelected?: boolean;
}

const Tile = ({
	onClick,
  className = "",
	children,
	isSelected = false
}: PropsWithChildren<Props>) => {
	return (
		<div
			onClick={onClick}
			className={cn(
				`min-w-[20ch] px-3 py-2 rounded-lg ${isSelected ? "bg-blue-600" : "bg-white/20"} text-white cursor-pointer ring-0 hover:ring-2 ring-blue-600 transition-all ease-in-out duration-200 flex justify-between items-center`,
        className
			)}>
			{children}
		</div>
	);
};

export default Tile;
