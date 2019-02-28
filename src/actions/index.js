import types from './types';

export const submitSearch = data => async dispatch => {
    console.log(data);
    return {
        type: types.SUBMIT_SEARCH,
    }
}