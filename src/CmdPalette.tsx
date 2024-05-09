import { useEffect, useCallback } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

const CmdPalette = ({isOpen, setIsOpen}: Props) => {
  const handleKeyEvent = useCallback((e: KeyboardEvent) => {
		if (e.metaKey && e.key === "k") {
			setIsOpen(true);
		}
    if (e.code === "Escape") {
      setIsOpen(false);
    }
	}, [setIsOpen]); 

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
			className="absolute bg-slate-800 text-white border border-black w-fit min-w-[60ch] flex justify-end items-center gap-1 p-5 rounded-xl transition-all ease-in-out duration-300 z-10">
			<button className="bg-blue-600 px-3 py-1 rounded">Reset Filters</button>
			<button
				className="bg-blue-600 px-3 py-1 rounded"
				onClick={() => setIsOpen(false)}>
				Show Pokémons
			</button>
		</div>
	);
}

export default CmdPalette;