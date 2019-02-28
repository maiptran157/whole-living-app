import types from '../actions/types';

const DEFAULT_STATE = {
    locationList: [],
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        // case types.SUBMIT_SEARCH:
        //     return { ...state, locationList: action };
        default:
            return state;
    }
}