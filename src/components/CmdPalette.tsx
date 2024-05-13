import { useEffect, useCallback, useState } from "react";
import Tile from "@/components/Tile";
import { FaChevronRight } from "react-icons/fa6";
import {
	ATTR_TYPE,
	ATTR_VALUES_MAP,
	ATTRIBUTES,
	CAT_ATTR_MAP,
	DATA_CATEGORIES,
} from "../data";
import { Link } from "react-router-dom";
import { BiReset } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";

interface Props {
	isOpen: boolean;
	setIsOpen: (state: boolean) => void;
}

const CmdPalette = ({ isOpen, setIsOpen }: Props) => {
	// States
	const [filters, setFilters] = useState<
		Record<string, string[] | number[] | (string | number)[]>
	>({});
	const [selectedDataCat, setSelectedDataCat] = useState<string>(
		DATA_CATEGORIES.pokemons,
	);
	const [selectedAttribute, setSelectedAttribute] = useState<string>("");

	// Handle select of filters depending on type of input "radio"/"checkbox"
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = e.target;

		if (!Object.keys(filters).includes(selectedAttribute)) {
			setFilters((prev) => {
				return { ...prev, [selectedAttribute]: [value] };
			});
		} else if (ATTR_TYPE[ATTRIBUTES[selectedAttribute]] === "radio") {
			setFilters((prev) => {
				return { ...prev, [selectedAttribute]: [value] };
			});
		} else if (
			ATTR_TYPE[ATTRIBUTES[selectedAttribute]] === "checkbox") {
			if(checked && !filters[selectedAttribute].includes(value as never)) {
				setFilters({...filters, [selectedAttribute]: [...filters[selectedAttribute], value]})
			} else {
				setFilters({...filters, [selectedAttribute]: filters[selectedAttribute].filter((opt: string | number) => opt !== value)})
			}
		}
	};

	// Keyboard Imputs
	const handleKeyEvent = useCallback(
		(e: KeyboardEvent) => {
			if (e.metaKey && e.key === "k") {
				setIsOpen(true);
			}
			if (e.code === "Escape") {
				setIsOpen(false);
				setSelectedDataCat(DATA_CATEGORIES.pokemons);
				setSelectedAttribute("");
				setFilters({});
			}
		},
		[setIsOpen],
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyEvent);
		return () => window.removeEventListener("keydown", handleKeyEvent);
	}, [handleKeyEvent]);

	return (
		<div
			style={{
				transform: isOpen ? "scale(100%)" : "scale(0)",
				opacity: isOpen ? 100 : 0,
			}}
			className="absolute bg-slate-800 text-white border border-black min-w-[50ch] max-w-[90ch] w-fit p-5 rounded-xl transition-all ease-in-out duration-300 z-10">
			<div className="flex gap-3 mb-5">
				<div className="flex flex-col gap-3">
					{Object.values(DATA_CATEGORIES).map((cat: string, id: number) => (
						<Tile
							className="w-4/12"
							isSelected={selectedDataCat === cat}
							key={id}
							onClick={() => {
								setSelectedDataCat(cat);
								setFilters({});
								setSelectedAttribute("");
							}}>
							{cat}
							<div className="flex justify-center items-center w-fit gap-1">
								{Object.values(filters).flat().length > 0 &&
									selectedDataCat === cat && (
										<span className="text-xs rounded-full px-2 bg-white/20 font-semibold">
											{Object.values(filters).flat().length}
										</span>
									)}
								<FaChevronRight />
							</div>
						</Tile>
					))}
				</div>
				<div className="flex flex-col gap-3">
					{CAT_ATTR_MAP[selectedDataCat].map((attr: string, id: number) => (
						<div key={id} className="relative group z-30">
							<Tile
								isSelected={selectedAttribute === attr}
								className="relative flex justify-between items-center w-4/12 z-30"
								onClick={() => setSelectedAttribute(attr)}>
								{ATTRIBUTES[attr]}
								<div className="flex justify-center items-center w-fit gap-1">
									{!!filters[attr] && filters[attr].length > 0 && (
										<span className="text-xs rounded-full px-2 bg-white/20 font-semibold">
											{filters[attr].length}
										</span>
									)}
									<FaChevronRight />
								</div>
							</Tile>
							{attr === selectedAttribute && (
								<button
									onClick={() => {
										setFilters({ ...filters, [selectedAttribute]: [] });
									}}
									className="absolute w-[2rem] z-20 right-0 top-2 group-hover:right-[-2rem] transition-all ease-in-out duration-200 h-8/12 bg-white/90 text-red-600 aspect-square rounded-r-md flex justify-center items-center">
									<BiReset className="hover:-rotate-45 transition-all ease-in-out duration-200" />
								</button>
							)}
						</div>
					))}
				</div>
				<div className="flex flex-col gap-3">
					{!!selectedAttribute &&
						ATTR_VALUES_MAP[ATTRIBUTES[selectedAttribute]].map(
							(opt: { name: string; value: string | number }, id: number) => (
								<div className="w-4/12" key={id}>
									<input
										type={ATTR_TYPE[ATTRIBUTES[selectedAttribute]]}
										className="hidden peer"
										id={opt.name}
										value={opt.value}
										name={selectedAttribute}
										checked={
											!!filters[selectedAttribute] &&
											filters[selectedAttribute].includes(opt.value as never)
										}
										onChange={handleInputChange}
									/>

									<label
										htmlFor={opt.name}
										className="bg-white/10 peer-checked:bg-green-500/70 peer-checked:text-green-200 min-w-[25ch] px-5 py-3 rounded-md cursor-pointer ring-0 hover:ring-2 ring-blue-600 transition-all ease-in-out duration-200 flex justify-start gap-3 items-center">
										<div
											className={`w-5 h-5 p-1 flex justify-center items-center bg-green-300 rounded-${
												ATTR_TYPE[ATTRIBUTES[selectedAttribute]] === "radio"
													? "full"
													: "md"
											}`}>
											{!!filters[selectedAttribute] &&
												filters[selectedAttribute].includes(
													opt.value as never,
												) && <FaCheck className="text-green-700" />}
										</div>
										{opt.name}
									</label>
								</div>
							),
						)}
				</div>
			</div>
			<div className="flex justify-end items-center gap-3">
				<button
					onClick={() => {
						setSelectedDataCat(DATA_CATEGORIES.pokemons);
						setSelectedAttribute("");
						setFilters({});
					}}
					className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium">
					Reset All Filters
				</button>
				<button
					className="bg-blue-600 px-6 py-2 rounded-lg text-sm "
					onClick={() => setIsOpen(false)}>
					<Link
						to={{
							pathname: "/result",
							search: `?data-type=${selectedDataCat}&filters=${JSON.stringify(
								filters,
							)}`,
						}}
						className="flex justify-center items-center gap-2">
						Show Pokémons
						<FaChevronRight />
					</Link>
				</button>
			</div>
		</div>
	);
};

export default CmdPalette;
