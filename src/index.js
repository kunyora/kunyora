import req from "./req"
import genCrud from "./crud-gen"
import Option from "./option"
import Emitter from "./events"
import store from "./store";

module.exports = function (config) {
	//work on the config
	const opt = Option(config);
	//load request
	const _req = req(opt);
	const _emitter = new Emitter();
	const _crud = genCrud(_req,opt);
	const _store = store(opt)
	return Object.assign({},_emitter,_req,_crud,_store)
};
try{
	window.composerClientFactory = module.exports;
	console.log("composer-client created for browser")
}catch (err){
	console.log("composer-client created for node env")
}
