import { STORE_USER_INFO } from '../actions/LocalStorage';

export default function store_user_info(state = {
    userName: null
}, action) {
	switch(action.type) {
        case STORE_USER_INFO:
            return Object.assign({}, state, {
                userName: action.username
            });
        default:
            return state;
    }
}