import { REQUEST_STORAGE, RECEIVE_STORAGE } from '../actions/StorageAction';

/**
 * [storage description]
 * @param  Object state type of data which changes in component and rerenders
 * @param  action tells reducer to perform certain actions
 * @return {state} based on action the function changes the state and rerenders
 */
export default function storage(
    state = {
        isFetching: false,
        data: {
            automobile: 'Car',
            type: 'Petrol',
            value: '10.3',
            unit: 'km/litre'
        }
    },
    action
) {
    switch (action.type) {
        case REQUEST_STORAGE:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_STORAGE:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data
            });
        default:
            return state;
    }
}
