import req from "./req"
import genCrud from "./crud-gen"
module.exports= function (config) {
	const r = req(config);

	const obj = genCrud(r,config);
	return obj
};