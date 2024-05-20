import { combineReducers } from "redux";
import datingAppReducer from './slices/OtpSlices';
import loginReducer from './slices/loginSlices';
import homeReducer from './slices/homeSlices';
import registerReducer from './slices/registerSlices';

export const rootReducers = combineReducers({
    datingAppReducer: datingAppReducer,
    loginReducer: loginReducer,
    homeReducer: homeReducer,
    registerReducer: registerReducer
});