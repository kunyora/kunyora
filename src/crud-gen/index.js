import response from "../res"
import camelcase from "camelcase"

/**
 * @description generate the crud methods for making the request
 * @param nouns {string[]|{path,name}[]} the nouns of the RESTFUL API
 * @param req {AxiosInstance} an axios request instance
 * @return {function(config)} the request function
 */
function generateMethod({noun, req, method,res}) {
	return function (config={}) {
		const newConfig = Object.assign({}, config);
		//Todo if path is set use the path instead of noun.path and oda shits
		let path= config.endpoint || noun.path;
		return req[method](`/${path}/${newConfig.ID?newConfig.ID:''}`,newConfig).then(response => {
			return res.handleThenables(camelcase(`${method}-${noun.name}`),method, response)
		})
			.catch(err => {
				return res.handleCatchables(camelcase(`${method}-${noun.name}`),method, err)
			})
	}
}

/**
 * @description used by the composer factory fn to generate all the  CRUD request for the nouns
 * @param req {axios} the axios request instance
 * @param config {object} the config passed to the composer factory function
 * @return {object}
 * @constructor
 */
export default function GenerateCrud(req,config) {
	let crud = {};
	const res = response(config);

	config.nouns.forEach((noun)=>{
		const methods = [["get","get"],["create","post"],["update","put"],["partUpdate","patch"],["delete","delete"]]
		methods.forEach(method=>{
			crud[camelcase(`${method[0]}-${noun.name}`)] = generateMethod({noun:noun,req:req,method:method[1],res})
		})
	});
	return crud
}