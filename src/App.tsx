import { useState } from "react";
import Logo from "./assets/p.svg";
import CmdPalette from "./components/CmdPalette";

function App() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
		<main className="relative w-full min-h-screen flex flex-col justify-center items-center">
			<div
				onClick={() => setIsOpen(false)}
				style={{
					opacity: isOpen ? 100 : 0,
					zIndex: isOpen ? 1 : -1,
				}}
				className="absolute w-full h-full top-0 left-0 bg-black/30 transition-all ease-in-out duration-300"
			/>
			<CmdPalette setIsOpen={setIsOpen} isOpen={isOpen} />
			<div className="flex items-center gap-3">
				<div className="flex justify-center items-center">
					<img src={Logo} alt="logo" className="w-[2rem]" />
					<span className="text-[2.5rem] mb-6 ml-[2px]">okemmand</span>
				</div>{" "}
				<div className="flex justify-center items-center">
					<img src={Logo} alt="logo" className="w-[2rem]" />
					<span className="text-[2.5rem] mb-6 ml-[2px]">alette</span>
				</div>
			</div>
			<button
				onClick={() => setIsOpen(true)}
				className="bg-gradient-to-b to-slate-900 from-slate-600 text-white px-3 py-2 rounded-lg">
				Filter Pokemons{" "}
				<kbd className="px-1 rounded bg-gradient-to-b from-slate-100 to-slate-300 border border-slate-400 text-black">
					Cmd
				</kbd>{" "}
				+{" "}
				<kbd className="px-1 rounded bg-gradient-to-b from-slate-100 to-slate-300 border border-slate-400 text-black">
					K
				</kbd>
			</button>
		</main>
	);
}

export default App;
