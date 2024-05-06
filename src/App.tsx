import Logo from "./assets/p.svg";

function App() {
  return (
		<main className="w-full min-h-screen flex justify-center items-center">
			<div className="flex justify-center items-center">
				<img src={Logo} alt="logo" className="w-[2rem]" />
				<span className="text-[2.5rem] mb-6 ml-[2px]">okemmand</span>
			</div>{" "}
			<div className="flex justify-center items-center ml-3">
				<img src={Logo} alt="logo" className="w-[2rem]" />
				<span className="text-[2.5rem] mb-6 ml-[2px]">allete</span>
			</div>
		</main>
	);
}

export default App
