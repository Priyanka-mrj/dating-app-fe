
const initialState = {
    otp: null,
    error: null,
    verificationResponse: null,
    verificationError: null,
    phnumber: '',
    profilename: '',
};

const otpReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GENERATE_OTP_SUCCESS':
            return {
                ...state,
                otp: action.payload,
                error: null,
            };
        case 'GENERATE_OTP_FAILURE':
            return {
                ...state,
                otp: null,
                error: action.error,
            };
        case 'VERIFY_OTP_SUCCESS':
            return {
                ...state,
                verificationResponse: action.payload,
                verificationError: null,
            };
        case 'VERIFY_OTP_FAILURE':
            return {
                ...state,
                verificationResponse: null,
                verificationError: action.payload,
            };
        case 'SET_PHNUMBER':
            return {
                ...state,
                phnumber: action.payload,
            };

        case 'SET_PROFILE_NAME':
            return {
                ...state,
                profilename: action.payload,
            };
       
        default:
            return state;
    }
};

export default otpReducer;


