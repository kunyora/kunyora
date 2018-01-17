import * as types from "./types";

export const requestHeader = {
    state= { id: Date.now(), options: {} },
    action
} => {
    switch (action.type) {
        case types.COMPOSER_SET_REQUEST_HEADER:
            return { ...state, id: Date.now(), options: action.options }
            break;
        default:
            return state;
    }
}