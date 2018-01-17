import invariant from "invariant"

const defaultConfig = {
	rootPath: "",
	nouns: [],
	thenables: {},
	catchables: {},
	headers:{}
};

export default function Option(config) {
	let option = Object.assign({}, defaultConfig, config);
	option.nouns = generateNouns(option);
	option.rootPath = parseRootPath(option);
	option.endpoint = generateEndpoint(option);
	//validate thenables and catchables
	validateThenableCatchable(option);


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

function validateDomain(domain) {
	invariant(typeof domain === "string", "domain passed to config must be a string");
	//Todo: improve regexp
	invariant(/^https?:\/\//.test(domain), "domain is not a valid url domain")
}

function parseRootPath({rootPath = ""}) {
	return rootPath
}

/**
 *
 * @param domain
 * @param rootPath
 * @return {string}
 */
function generateEndpoint({domain, rootPath}) {
	//validate the domain
	validateDomain(domain);
	return `${domain.replace(/\/$/, "")}/${rootPath.replace(/^\//, "")}`
}

function validateThenableCatchable({thenables, catchables}) {
	function validateState(obj) {
		for (let prop in obj) {
			invariant(typeof obj[prop] === "function", `the property ${prop} is not a type function`)
		}
	}

	validateState(thenables);
	validateState(catchables)
}