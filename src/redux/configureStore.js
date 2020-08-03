import { createStore, combineReducers, applyMiddlewar, applyMiddleware } from 'redux';
import { createForms } from "react-redux-form";
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            //reducer for forms
            //will automatially add reducer for feedbacks
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        //Apply MiddleWare returns a store enhancer
        applyMiddleware( thunk, logger)
    );

    return store;
}