import createComposerThunk from "./middlewares";
import * as reducers from "./reducers";

export default config => ({
  middlewares: createComposerThunk,
  reducers: Object.assign({}, reducers)
})