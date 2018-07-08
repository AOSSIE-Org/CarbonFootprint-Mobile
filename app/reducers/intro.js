import { FIRST_OPEN } from '../actions/IntroAction';

export default function Intro(
    state = {
        isFirst: true
    },
    action
) {
    switch (action.type) {
        case FIRST_OPEN:
            return Object.assign({}, state, {
                isFirst: false
            });
        default:
            return state;
    }
}
