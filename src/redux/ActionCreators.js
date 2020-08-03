import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';

//Function that creats a action types
export const addComment = (dishId, rating, author, comment) => ({
    //Every action object must contain a type
    type: ActionTypes.ADD_COMMENT,
    //payload contains what ever data that needs to be carried
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

//All action creators below
//used to fetch dishses
//creating a thunk to tetch dishess, i.e returns a function 
/*
    this thunk does 2 dispacthes
    after 2 second delay dispatches another dispatch
*/

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    //introducing delay, setting a delay
    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000);
}


/* Returns a action object
*/
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_Failed,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});