import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { verifyOTPSuccess, verifyOTPFailure, sagaActions } from './SagaActions';
import BaseApi, { getBaseUrl } from '../../common/BaseApi';
import { API_URLS } from '../../common/Endpoints';
import { endFetchingSuggestion } from '../slices/homeSlices';
import { registrationFailure, registrationRequestStart, registrationSuccess } from '../slices/registerSlices';
import { setIsLoggedInUserProfileLoading, setLoggedInUserProfile, setLogin } from '../slices/loginSlices';
import { navigate } from '../../navigation/NavigationService';
import { SCREENS_NAME } from '../../navigation/ScreensName';
import { ERROR_CODE } from '../../common/Constants';
import { showToast } from '../../common/CommonUtils';



function* generateOTPSaga(action) {
    try {
        const endPoint = `${getBaseUrl()}${API_URLS.GENERATE_OTP}`;
        const response = yield call(axios.post, endPoint, {
            mobile_no: action?.payload?.mobileNo,
        });
        const otp = response?.data;
        yield put({ type: 'GENERATE_OTP_SUCCESS', payload: otp });
    } catch (error) {
        showToast(ERROR_CODE._101, error?.message || error?.data?.message);
        yield put({ type: 'GENERATE_OTP_FAILURE', error });
    }
}

function* verifyOTPSaga(action) {
    try {
        const endPoint = `${getBaseUrl()}${API_URLS.VERIFY_OTP}`;
        const response = yield call(axios.post, endPoint, {
            mobile_no: action.payload.mobileNo,
            otp: action.payload.otp,
        });
        yield put(verifyOTPSuccess(response.data));
    } catch (error) {
        showToast(ERROR_CODE._102, error?.message || error?.data?.message);
        yield put(verifyOTPFailure(error));
    }
}

function* registerUserSaga(action) {
    try {

        yield put(registrationRequestStart());
        const { payload } = action;
        const endPoint = `${getBaseUrl()}${API_URLS.REGISTRATION}`;
        const response = yield axios.post(endPoint, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        });
        if(response?.status === 200) {
            navigate(SCREENS_NAME.CONGRATSPAGE);
            yield put(registrationSuccess(response.data));
        }
        else {
            showToast(ERROR_CODE._103, error?.message || error?.data?.message);
            yield put(registrationFailure('Something wrong with resgister api...'));
        }
        
    } catch (error) {
        showToast(ERROR_CODE._104, error?.message);
        yield put(registrationFailure(error?.message || error?.data?.message));
    }
}

function* getsuggestionList(action) {
    try {
        const { payload:{token, is_premium} } = action;
        const params = is_premium ? {token, query: {is_premium}} : {token}
        const response = yield BaseApi.get(API_URLS.SUGGESTION, params);
        yield put(endFetchingSuggestion(response.data?.data));
    } catch (error) {
        showToast(ERROR_CODE._105, error?.message || error?.data?.message);
        yield put(endFetchingSuggestion([]));
    }
}

function* setLoggedInProfileDetails(action) {
    try {
        yield put(setIsLoggedInUserProfileLoading(true));
        const token = action.payload.token;
        const response = yield BaseApi.get(API_URLS.PROFLE_DETAIL, {token});
        yield put(setLoggedInUserProfile(response.data?.data));
        yield put(setIsLoggedInUserProfileLoading(false));
    } catch (error) {
        showToast(ERROR_CODE._118, error?.message || error?.data?.message);
        yield put(setLoggedInUserProfile(null));
        yield put(setIsLoggedInUserProfileLoading(false));
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery('GENERATE_OTP', generateOTPSaga),
        takeEvery('VERIFY_OTP', verifyOTPSaga),
        takeLatest(sagaActions.REGISTERATION_REQUEST_SAGA, registerUserSaga),
        takeLatest(sagaActions.FETCH_SUGGESTION_LIST_SAGA, getsuggestionList),
        takeLatest(sagaActions.FETCH_LOGGED_IN_PROFILE_DETAIL, setLoggedInProfileDetails),
    ]);
}