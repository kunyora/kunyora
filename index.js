let c = null;

try{
	if (window){
		c = require("./dist/composer-client-frontend");
		//make it accessible globally through the window
		window.composer = c
	}
}catch (err){
	c = require("./dist/composer-client-backend")
}

module.exports = c;
