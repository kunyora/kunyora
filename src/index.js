import store from "./store";

let reducers = store({ endPoint: "gad" })

console.log(reducers.middlewares);