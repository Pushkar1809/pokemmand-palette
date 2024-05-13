import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";
import { useGraphQL } from "../hooks/useGraphQL";


const Result = () => {
  const location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location]);
  const dataType = useMemo(() => queryParams.get("data-type"), [queryParams]);
  const stringyFilters = useMemo(() => queryParams.get("filters"), [queryParams]);
  const filters = JSON.parse(stringyFilters || "{}");
	const { data, error, loading } = useGraphQL(dataType || "", filters);

  return (
		<section className="relative flex flex-col justify-start items-center w-full p-10">
			<Link
				to="/"
				className="bg-blue-700/10 text-blue-700 px-3 py-1 rounded-lg fixed top-10 left-10 w-fit">
				{"< Back"}
			</Link>
			{!!error && <h1 className="text-2xl font-bold">Something Went Wrong</h1>}
			{!!loading && (
				<h1 className="text-2xl font-bold">Loading {dataType}...</h1>
			)}
			{!!data && (
				<h1 className="text-2xl font-bold">
					Found {data.result.length} {dataType}
				</h1>
			)}
			{!!error && <pre className="font-mono text-red-700 bg-red-500/20 rounded-xl py-5 px-7 mt-10">{JSON.stringify(error)}</pre>}
			{!!loading && <LuLoader2 className="animate-spin mt-10"/>}
			{!!data && (
				<div className="flex flex-col items-center justify-start gap-2 w-full max-w-[50ch] mt-5 max-h-[85vh] overflow-y-scroll">
					{data.result.map(({ name }: { name: string }, id: number) => (
						<div
							className="w-full rounded-xl bg-black/10 text-black py-4 px-8 capitalize text-xl font-medium shadow-sm"
							key={id}>
							{name}
						</div>
					))}
				</div>
			)}
		</section>
	);
}

export default Result;