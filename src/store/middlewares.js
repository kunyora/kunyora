import * as types from "../types";
import invariant from "invariant";

export default function createComposerThunk({
  useBeforeRequest,
  useAfterResponse
}) {
  return ({ dispatch, getState }) => next => action => {
    switch (action.type) {
      case types.COMPOSER_SEND_REQUEST_HEADER_CMD:
        invariant(
          (useBeforeRequest && typeof useBeforeRequest === "function") ||
          !useBeforeRequest,
          "The useBeforeRequest helper must be a function which returns a new request object"
        );
        if (useBeforeRequest && typeof useBeforeRequest === "function") {
          let _reqObj = useBeforeRequest();
          //return a thunk that uses the _reqObj to make an Async action and makes the appropriate request
          invariant(
            _reqObj &&
            typeof _reqObj === "object" &&
            !(_reqObj instanceof Array) &&
            "options" in _reqObj,
            "A request Object of type [Object] must be returned from the useBeforeRequest helper and must be of shape req.options[useHeaderNameHere]"
          );
          dispatch({
            type: types.COMPOSER_SET_REQUEST_HEADER,
            request: _reqObj
          });
        } else {
          //return a thunk that still uses the old _reqObj to make an Async action and makes the appropriate request
          dispatch({ type: types.COMPOSER_SET_REQUEST_HEADER, request: {} });
        }
        break;
      case types.COMPOSER_SEND_RESPONSE_TO_MIDDLEWARE:
        invariant(
          (useAfterResponse && typeof useAfterResponse === "function") ||
          !useAfterResponse,
          "The useAfterResponse helper must be a custom function which performs a task on the response"
        );
        //return a thunk that calls an appropriate using the dispatch
        if (useAfterResponse && typeof useAfterResponse === "function") {
          useAfterResponse(action.response, { dispatch, getState });
        }
        break;
      default:
        return next(action);
    }
  };
}
