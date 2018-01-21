import invariant from "invariant"

const defaultConfig = {
	nouns: [],
	thenables: {},
	catchables: {},
	headers:{}
};

export default function Option(config) {
	let option = Object.assign({}, defaultConfig, config);
	option.nouns = generateNouns(option);
	//validate thenables and catchables


	return option
}

/**
 *
 * @param nouns {string[]|object[]}
 */
function generateNouns({nouns = []}) {
	return nouns.map((noun, index) => {
		if (typeof noun === "string") {
			validateNounString(noun);
			return {path: noun, name: noun}
		} else if (typeof noun === "object" && noun !== null) {
			validateNoun(noun);
			return noun
		} else {
			throw Error("Error: all nouns should either be a string or an object")
		}
	})
}

function validateNounString(str, v) {
	invariant(typeof str === "string", "Error: " + (!!v) ? `property ${v} in noun not a string` : `noun passed is not a string`);
	//
	invariant(/^[0-9a-zA-Z_]+$/.test(str), "Error: " + (!!v) ? `property ${v} in noun contains invalid char. alphanumeric and underscore allowed` : ` noun contains invalid char. alphanumeric and underscore allowed`)
}

function validateNoun({path, name}) {
	validateNounString(path, "path");
	validateNounString(name, "name")
}
