import { useEffect, useMemo, useState } from "react";
import { DATA_CATEGORIES } from "../data";
const BASE_URL = "https://beta.pokeapi.co/graphql/v1beta";

interface State {
	data: Record<"result", { name: string }[]> | undefined;
	error?: unknown;
	loading: boolean;
}

export const useGraphQL = (
	dataType: string,
	filters: Record<string, string[] | number[] | (string | number)[]>,
): State => {
	const [data, setData] = useState<
		Record<"result", { name: string }[]> | undefined
	>();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<unknown>();

	const requestBody: string | undefined = useMemo(() => {
		if (dataType === DATA_CATEGORIES.pokemons) {
			const whereClause = [
				filters["generation"]
					? `{pokemon_v2_generation:{name:{_eq:"${filters["generation"][0]}"}}}`
					: null,
				filters["color"]
					? `{pokemon_v2_pokemoncolor:{name:{_eq: "${filters["color"][0]}"}}}`
					: null,
				filters["habitat"]
					? `{pokemon_v2_pokemonhabitat:{name:{_in:["${filters["habitat"].join(
							'","',
					)}"]}}}`
					: null,
			]
				.filter(Boolean)
				.join(",");
			return JSON.stringify({
				query: `query{result:pokemon_v2_pokemonspecies(where:${whereClause}){name}}`,
			});
		} else if (dataType === DATA_CATEGORIES.moves) {
			const whereClause = [
				filters["class"]
					? `{pokemon_v2_movedamageclass:{name:{_eq:"${filters["class"][0]}"}}}`
					: null,
				filters["pp"] ? `{pp:{name:{_gt:"${filters["pp"][0]}"}}}` : null,
			]
				.filter(Boolean)
				.join(",");
			return JSON.stringify({
				query: `query{result:pokemon_v2_move(where:${whereClause}){name}}`,
			});
		}
	}, [dataType, filters]);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await fetch(BASE_URL, {
					method: "post",
					body: requestBody,
					headers: {
						"Content-Type": "application/json",
					},
				});
				const data = await res.json();
				setData(data.data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [requestBody]);

	return { data, error, loading };
};
