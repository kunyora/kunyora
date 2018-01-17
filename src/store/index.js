import createComposerThunk from "./middlewares";
import reducers from "./reducers";

export default config => ({
  middlewares: createComposerThunk,
  reducers
})