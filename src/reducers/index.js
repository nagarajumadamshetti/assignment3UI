import { combineReducers } from 'redux';
import signUpReducer from './signUpReducer';
import adminReducer from './adminReducer';
import loginReducer from './loginReducer';
export default combineReducers({
    signUpReducer,
    adminReducer,
    loginReducer
})