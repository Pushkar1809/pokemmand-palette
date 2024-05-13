import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Result from './pages/Result';

const App = () => {
  return (
		<main className="relative w-full min-h-screen flex justify-center items-center">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/result" element={<Result />} />
			</Routes>
		</main>
	);
}

export default App;