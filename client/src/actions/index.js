import types from './types';
import axios from 'axios';

export const submitSearch = data => async dispatch => {
    try {
        const resp = await axios.get(`http://localhost:5000/api/getGooglePlacesData?address=${data.address}&&keyPlace=${data.keyPlace}`)
        dispatch({
            type: types.SUBMIT_SEARCH,
            payload: resp.data
        })
    } catch (err) {
        console.log(err)                     //Axios entire error message
    }
}

export const getSearchResult = () => {
    return {
        type: types.GET_SEARCH_RESULT
    }
}