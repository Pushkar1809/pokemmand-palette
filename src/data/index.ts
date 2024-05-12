export const DATA_CATEGORIES: Record<string, string> = Object.freeze({
	pokemons: "Pokemons",
	moves: "Moves"
})

export const ATTRIBUTES: Record<string, string> = Object.freeze({
	generation: "Generation",
	color: "Color",
	habitat: "Habitat",
	class: "Move Class",
	pp: "Power Points"
})

export const ATTR_TYPE: Record<string, "radio" | "checkbox"> = Object.freeze({
	[ATTRIBUTES.generation]: "radio",
	[ATTRIBUTES.color]: "radio",
	[ATTRIBUTES.habitat]: "checkbox",
	[ATTRIBUTES.class]: "radio",
	[ATTRIBUTES.pp]: "radio",
});

export const CAT_ATTR_MAP: Record<string, string[]> = Object.freeze({
	[DATA_CATEGORIES.pokemons]: ["generation", "color", "habitat"],
	[DATA_CATEGORIES.moves]: ["class", "pp"]
})

export const ATTR_VALUES_MAP: Record<
	string,
	{ name: string; value: string | number }[]
> = Object.freeze({
	[ATTRIBUTES.generation]: [
		{ name: "Generation I", value: "generation-i" },
		{ name: "Generation II", value: "generation-ii" },
		{ name: "Generation III", value: "generation-iii" },
	],
	[ATTRIBUTES.color]: [
		{ name: "Red", value: "red" },
		{ name: "Green", value: "green" },
		{ name: "Blue", value: "blue" },
	],
	[ATTRIBUTES.habitat]: [
		{ name: "Grassland", value: "grassland" },
		{ name: "Mountain", value: "mountain" },
		{ name: "Water", value: "water's edge" },
	],
	[ATTRIBUTES.class]: [
		{ name: "Physical", value: "physical" },
		{ name: "Special", value: "special" },
		{ name: "Status", value: "status" },
	],
	[ATTRIBUTES.pp]: [
		{ name: "above 10", value: 10 },
		{ name: "above 15", value: 15 },
		{ name: "above 20", value: 20 },
	],
});