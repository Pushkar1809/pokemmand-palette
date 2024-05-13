import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import useGraphql from "../hooks/useGraphql";

const Result = () => {
  const location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location]);
  const dataType = queryParams.get("data-type");
  const stringyFilters = queryParams.get("filters");

  console.log(dataType, stringyFilters)

  const [{data, loading, error}] = useGraphql(dataType || "", JSON.parse(stringyFilters || "{}"));

  return <section className="relative flex flex-col justify-start items-center">
    <Link to="/" className="bg-blue-700/10 text-blue-700 px-3 py-1 rounded-lg absolute top-10 left-10">{"< Back"}</Link>
    { !!error && <p>{JSON.stringify(error)}</p> }
    { !!loading && <p>Loading Data...</p> }
    { !!data && <pre>{JSON.stringify(data, null, 2)}</pre> }
  </section>
}

export default Result;