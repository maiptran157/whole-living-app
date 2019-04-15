import types from './types';
import axios from 'axios';

export const submitSearch = data => async dispatch => {
    try {
        const resp = await axios.get(`/api/getGooglePlacesData?address=${data.address}&&keyPlace=${data.keyPlace}`)
        dispatch({
            type: types.SUBMIT_SEARCH,
            payload: resp.data
        })
    } catch (error) {
        dispatch({
            type: types.SUBMIT_SEARCH,
            payload: error.message
        })
        console.log(error);                    //Axios entire error message
    }
}

export const getSearchResult = () => {
    return {
        type: types.GET_SEARCH_RESULT
    }
}