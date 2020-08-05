import * as ActionTypes from "./ActionTypes";
export const Promotions = (state = {
    isLoading: true,
    errMess: null,
    promotions: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROMOS:
            return { ...state, isLoading: false, errMess: null, promotions: action.payload }

        case ActionTypes.PROMOS_LOADING:
            //... Spread Operator ES6
            //state is not modified, applies changes to state according to modifications profided
            return { ...state, isLoading: true, errMess: null, promotions: [] }

        case ActionTypes.PROMOS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, promotions: [] }

        default:
            return state;

    }
}