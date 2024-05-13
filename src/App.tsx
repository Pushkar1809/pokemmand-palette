import { Routes, Route } from 'react-router-dom';
import * as React from 'react';

const Home = React.lazy(() => import("./pages/Home"));
const Result = React.lazy(() => import("./pages/Result"));

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