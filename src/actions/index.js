import types from './types';
import axios from 'axios';
// import apiKey from '../config/api_key';

export const submitSearch = data => async dispatch => {
    console.log("data:", data);
    try {
        const resp = await axios.get(`http://localhost:5000/api/getGooglePlacesData?address=${data.address}&&keyPlace=${data.keyPlace}`)
        dispatch({
            type: types.SUBMIT_SEARCH,
            payload: resp.data
        })
    } catch (err) {
        console.log(err)                     //Axios entire error message
        //console.log(err.response.data.error) //Google API error message 
    }
}

export const getSearchResult = () => {
    return {
        type: types.GET_SEARCH_RESULT
    }
}