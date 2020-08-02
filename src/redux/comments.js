import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            console.log("Comment: ", comment);
            //concat pushes a new element on the state arrray but insted of modifying the state it creats new object
            //creats a new value
            return state.concat(comment);

        default:
            return state;
    }
};

            