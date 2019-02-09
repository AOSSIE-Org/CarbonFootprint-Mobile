import { LOADER_TOGGLE } from '../actions/LoaderAction';

export default function loader (
    state = {
        isLoading: false
    },
    action
) {

    switch(action.type) {
        case LOADER_TOGGLE:
            return Object.assign({}, state, {
                isLoading: !state.isLoading
            });
        default:
            return state;
    }
}

