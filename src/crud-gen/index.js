import response from "../res"
import camelcase from "camelcase"

/**
 *
 * @param nouns
 * @param req {axios}
 * @return {*}
 */
function generateMethod({noun, req, method,res}) {
	return function (config) {
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