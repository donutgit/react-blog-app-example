import { combineReducers } from 'redux';
import PostReducer from './reducer_posts';
import { reducer as formReducer } from 'redux-form'; // взять reducer из redux-form и впихнуть в переменную formReducer


const rootReducer = combineReducers({
  posts: PostReducer,
  form: formReducer
});

export default rootReducer;
