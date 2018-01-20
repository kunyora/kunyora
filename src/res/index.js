export default function ({thenables,catchables}) {
	return {
		handleCatchables(name, err){
			console.error(err.message,name)
		},
		handleThenables(name,res){
			console.log(res.data)
		}
	}
}