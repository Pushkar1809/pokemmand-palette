import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { DATA_CATEGORIES } from "../data";

const BASE_URL = "https://beta.pokeapi.co/graphql/v1beta";

interface State<T> {
	data: undefined | T;
	error?: Error;
	loading: boolean;
}

interface GqlProps {
	body: string;
	headers?: Record<string, string> | null;
}

type Action<T> =
	| { type: "loading" }
	| { type: "fetched"; payload: T }
	| { type: "error"; payload: Error }
	| { type: "none" };

async function fetchData<T = unknown>({
	body,
	headers = null,
}: GqlProps): Promise<T> {
	if (!headers) {
		headers = {
			"Content-Type": "application/json",
		};
	}

	const response = await fetch(BASE_URL, {
		method: "post",
		body,
		headers,
	});
	return response.json();
}

export function useGraphql<T = unknown>(
	dataCategory: string,
	filters: Record<string, string[] | number[] | (string | number)[]>,
): [State<T>] {
	const cancelRequest = useRef<number>(0);

	const initialState: State<T> = useMemo(
		() => ({
			error: undefined,
			data: undefined,
			loading: false,
		}),
		[],
	);

	let requestBody: string = "";
	if (dataCategory === DATA_CATEGORIES.pokemons) {
		requestBody = JSON.stringify({
			query: `query PokemonQuery {
    pokemons: pokemon_v2_pokemonspecies(
      where: {
        ${
					!!filters["generation"] &&
					`pokemon_v2_generation: {name: {_eq: "${filters["generation"][0]}"}}`
				},
        ${
					!!filters["color"] &&
					`pokemon_v2_generation: {name: {_eq: "${filters["color"][0]}"}}`
				},
        ${
					!!filters["habitat"] &&
					`pokemon_v2_generation: {name: {_eq: "${JSON.stringify(
						filters["habitat"],
					)}"}}`
				}
      }) {
      name
     }
  }`,
		});
	} else if (dataCategory === DATA_CATEGORIES.moves) {
		requestBody = JSON.stringify({
			query: `query MovesQuery {
      moves: pokemon_v2_move(
        where: {
          ${
						!!filters["class"] &&
						`pokemon_v2_movedamageclass: {name: {_eq: ${filters["class"]}}}`
					},
          ${!!filters["pp"] && `pp: {_gt: ${!!filters["pp"]}}`}
        }
      ) {
        name
      }
    }`,
		});
	}


	// Keep state logic separated
	const fetchReducer = useCallback(
		(state: State<T>, action: Action<T>): State<T> => {
			switch (action.type) {
				case "loading":
					return { ...initialState, loading: true };
				case "fetched":
					return { ...initialState, data: action.payload, loading: false };
				case "error":
					return { ...initialState, error: action.payload, loading: false };
				case "none":
					return { ...initialState };
				default:
					return state;
			}
		},
		[initialState],
	);

	const [state, dispatch] = useReducer(fetchReducer, initialState);

	const fetchNitro = useCallback(
		async (
			reqId: number,
		) => {
			dispatch({ type: "loading" });

			try {
				const data = await fetchData<T>({
					body: requestBody,
				});

				console.log(data);

				if (cancelRequest.current !== reqId) {
					return;
				}

				dispatch({ type: "fetched", payload: data });
			} catch (error) {
				if (cancelRequest.current !== reqId) {
					return;
				}
				if (error)
					dispatch({
						type: "error",
						payload: new Error("Something went Wrong"),
					});
				else dispatch({ type: "error", payload: error as Error });
			}
		},
		[requestBody],
	);

	useEffect(() => {
		if (!dataCategory || Object.keys(filters).length <= 0) {
			dispatch({
				type: "error",
				payload: new Error("Required Params or data category is stale"),
			});
			return;
		}

		fetchNitro(cancelRequest.current);

		return () => {
			cancelRequest.current += 1;
		};
	}, [fetchNitro, dataCategory, filters]);

	return [state];
}

export default useGraphql;
