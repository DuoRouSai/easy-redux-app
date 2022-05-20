import { combineReducers } from '../redux';

export const count = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

export const userInfo  = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return action.userInfo;
        default:
            return state;
    }
}


export default combineReducers({
    count,
    userInfo
})
