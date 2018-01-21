import req from "./req"
import genCrud from "./crud-gen"
import Option from "./option"
import Emitter from "./events"
module.exports= function (config) {
	//work on the config
	const opt = Option(config);
	//load request
	const r = req(opt);
	const ev = new Emitter();
	const crud = genCrud(r,opt);
	return Object.assign({},ev,r,crud)
};