let c = null;

try{
	if (window){
		c = require("./dist/composer-client-frontend")
	}
}catch (err){
	c = require("./dist/composer-client-backend")
}

module.exports = c;
