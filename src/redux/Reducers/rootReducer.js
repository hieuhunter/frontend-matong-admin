import { combineReducers } from 'redux';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
	auth: loginReducer
});
export default rootReducer;
