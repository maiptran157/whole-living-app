import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import searchReducer from './search_reducer';

const rootReducer = combineReducers({
    search: searchReducer,
    form: formReducer
});

//blue printing what our state will look like
//everytimE you built a new reducer, add it to the rootReducer

export default rootReducer;