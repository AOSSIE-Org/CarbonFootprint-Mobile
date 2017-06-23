import { ActionConst } from 'react-native-router-flux';

export default function route(state={
    scene: {}
}, action) {
    switch(action.type) {
        case ActionConst.FOCUS:
            return Object.assign({}, state, {
                scene: action.scene
            });
        default:
            return state;
    }
}
