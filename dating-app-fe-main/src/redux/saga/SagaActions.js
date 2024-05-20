export const sagaActions = {
    FETCH_SUGGESTION_LIST_SAGA: "FETCH_SUGGESTION_LIST_SAGA",
    REGISTERATION_REQUEST_SAGA: "REGISTERATION_REQUEST_SAGA",
    FETCH_LOGGED_IN_PROFILE_DETAIL: "FETCH_LOGGED_IN_PROFILE_DETAIL"
};

export const generateOTP = (mobileNo) => ({
    type: 'GENERATE_OTP',
    payload: {
        mobileNo,
    },
});

export const verifyOTP = (mobileNo, otp) => ({
    type: 'VERIFY_OTP',
    payload: {
        mobileNo,
        otp,
    },
});

export const verifyOTPSuccess = (response) => ({
    type: 'VERIFY_OTP_SUCCESS',
    payload: response,
});

export const verifyOTPFailure = (error) => ({
    type: 'VERIFY_OTP_FAILURE',
    payload: error,
});

export const setPhnumber = (phnumber) => {
    return {
        type: 'SET_PHNUMBER',
        payload: phnumber,
    };
};

export const setProfileName = (profilename) => {
    return {
        type: 'SET_PROFILE_NAME',
        payload: profilename,
    };
};


const fetchSuggestionList = (token, is_premium) => {
    return {
        type: sagaActions.FETCH_SUGGESTION_LIST_SAGA,
        payload: {
            token,
            is_premium
        }
    }
}

const registrationRequestSaga = (formData) => {
    return {
        type: sagaActions.REGISTERATION_REQUEST_SAGA,
        payload: formData
    }
}

const setLoggedInProfileDetailSaga = (token) => {
    return {
        type: sagaActions.FETCH_LOGGED_IN_PROFILE_DETAIL,
        payload: {
            token
        }
    }
}


export {
    fetchSuggestionList,
    registrationRequestSaga,
    setLoggedInProfileDetailSaga
}

