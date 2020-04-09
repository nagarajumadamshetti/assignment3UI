import { combineReducers } from 'redux';
import signUpReducer from './signUpReducer';
import adminReducer from './adminReducer';
import loginReducer from './loginReducer';
import userReducer from './userReducer'
export default combineReducers({
    signUpReducer,
    adminReducer,
    loginReducer,
    userReducer
})