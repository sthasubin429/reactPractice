import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';

//Function that creats a action types
// export const addComment = (dishId, rating, author, comment) => ({
//     //Every action object must contain a type
//     type: ActionTypes.ADD_COMMENT,
//     //payload contains what ever data that needs to be carried
//     payload: {
//         dishId: dishId,
//         rating: rating,
//         author: author,
//         comment: comment
//     }
// });

//New addComment Implemented
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

//Posting New comment to servers
export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => { console.log('post comments', error.message); alert('Your comment could not be posted\nError: ' + error.message); });
};

//All action creators below
//used to fetch dishses
//creating a thunk to fetch dishess, i.e returns a function 
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

/**How then Works?
 * then are promises
 * the return value from top then/promise is taken as a parameter for the then/promise below
 *
 */
    return fetch(baseUrl + 'dishes')
        .then(response => {
            //checks if error has occoured
            //if the status code is ok simply throws the response
            //the throw is then catched
            if (response.ok){
                return response;
            }
            //if error occurs in response, new Error object is created and returned
            else{
                var error = new Error('Error ' + response.status + ':' + response.statusText)
                error.response = response;
                throw error;
            }

        },
        //Error handling if the server fails to response
        error => {
            var errmess = new Error(error.message );
            throw errmess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        //Catching the error thrown above
        .catch(error => dispatch(dishesFailed(error.message)));
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
        .then(response => {
            //checks if error has occoured
            //if the status code is ok simply throws the response
            //the throw is then catched
            if (response.ok) {
                return response;
            }
            //if error occurs in response, new Error object is created and returned
            else {
                var error = new Error('Error ' + response.status + ':' + response.statusText)
                error.response = response;
                throw error;
            }

        },
            //Error handling if the server fails to response
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));

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
        .then(response => {
            //checks if error has occoured
            //if the status code is ok simply throws the response
            //the throw is then catched
            if (response.ok) {
                return response;
            }
            //if error occurs in response, new Error object is created and returned
            else {
                var error = new Error('Error ' + response.status + ':' + response.statusText)
                error.response = response;
                throw error;
            }

        },
            //Error handling if the server fails to response
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));

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

export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFeedback = (feedback) => (dispatch) => {

    const newFeedback = Object.assign({}, feedback);
    newFeedback.date = new Date().toISOString();

    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => alert(`Thank you for your feedback! ${JSON.stringify(response)}`))
        .catch(error => { console.log('post feedback', error.message); alert('Your feedback could not be posted\nError: ' + error.message); });
};