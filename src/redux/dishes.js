import * as ActionTypes from './ActionTypes';

//returns accoding to state and action type
//action.payload carries the error Message or the dishes from the store
export const Dishes = (state = {
    isLoading: true,
    errMess: null,
    dishes: []
}, action) =>{
    switch(action.type){
        case ActionTypes.ADD_DISHES:
            return { ...state, isLoading: false, errMess: null, dishes: action.payload }

        case ActionTypes.DISHES_LOADING:
            //... Spread Operator ES6
            //state is not modified, applies changes to state according to modifications profided
            return {...state,  isLoading: true, errMess: null, dishes: []}

        case ActionTypes.DISHES_Failed:
            return { ...state, isLoading: false, errMess: action.payload, dishes: [] }

        default:
            return state;

    }
}