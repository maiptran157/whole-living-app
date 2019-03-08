import types from '../actions/types';

const DEFAULT_STATE = {
    locationList: null,
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.SUBMIT_SEARCH:
            console.log("action:", action)
            return { ...state, locationList: action.action.results };
        default:
            return state;
    }
}