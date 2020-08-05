import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';

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
    //simmulation to fetching data from server but serves data from dihses.js file
    // setTimeout(() => {
    //     dispatch(addDishes(DISHES));
    // }, 2000);

    //fetch dishes from server running on baseURL
    return fetch(baseUrl + 'dishes')
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)));
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

//for Comments

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comments
})

//for PROMos

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));
    return fetch(baseUrl + 'promotions')
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)));
}


/* Returns a action object
*/
export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});