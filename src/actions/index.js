import types from './types';
import axios from 'axios';
import apiKey from '../config/api_key';

export const submitSearch = data => async dispatch => {
    console.log("data:", data);
    try {
        // const resp = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${data.keyPlace.split(" ").join("+")}+in+${data.region}&key=${apiKey.GOOGLE_PLACES_API_KEY}`)
        const resp = await axios.get(`http://localhost:5000/api/getGooglePlacesData?region=${data.region}&&keyPlace=${data.keyPlace}`)
        console.log("resp:", resp);
        dispatch({
            type: types.SUBMIT_SEARCH,
            // quote: resp.data.message
        })
    } catch (err) {
        console.log(err)                     //Axios entire error message
        //console.log(err.response.data.error) //Google API error message 
    }
}