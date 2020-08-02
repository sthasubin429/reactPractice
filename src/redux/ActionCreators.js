import * as ActionTypes from './ActionTypes';

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