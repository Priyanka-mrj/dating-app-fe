import { createSlice } from '@reduxjs/toolkit'

export const REGISTER_STATE_KEY_NAMES = {
    name: 'name',
    dob: 'dob', 
    gender: 'gender',
    height: 'height',
    language: 'language',
    belief: 'belief',
    interest: 'interest',
    profilePics: 'profilePics',
    coffeeDate: 'coffeeDate',
    movieDate: 'movieDate',
    restaurantDate: 'restaurantDate',
    lunchDate: 'lunchDate'

}

const initialState = {
    registerFormData: {
        [REGISTER_STATE_KEY_NAMES.name]: null,
        [REGISTER_STATE_KEY_NAMES.dob]: null, 
        [REGISTER_STATE_KEY_NAMES.gender]: null,
        [REGISTER_STATE_KEY_NAMES.height]: null,
        [REGISTER_STATE_KEY_NAMES.language]: null,
        [REGISTER_STATE_KEY_NAMES.belief]: null,
        [REGISTER_STATE_KEY_NAMES.interest]: null,
        [REGISTER_STATE_KEY_NAMES.profilePics]: null,
        [REGISTER_STATE_KEY_NAMES.coffeeDate]: null,
        [REGISTER_STATE_KEY_NAMES.movieDate]: null,
        [REGISTER_STATE_KEY_NAMES.restaurantDate]: null,
        [REGISTER_STATE_KEY_NAMES.lunchDate]: null
    },
    isLoading: false,
    registrationError: null,
    registrationSucess: null
};

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setRegisterFormData: (state, action) => {
            state.registerFormData = {
                ...state.registerFormData,
                [action.payload.keyName]: action.payload.value,
              };
        },
        registrationRequestStart: (state, action) => {
            state.isLoading = true;
        },
        registrationSuccess: (state, action) => {
            state.isLoading = false;
            state.registrationSucess = action.payload;
        },
        registrationFailure: (state, action) => {
            state.isLoading = false;
            state.registrationError = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setRegisterFormData, registrationSuccess, registrationFailure, registrationRequestStart } = registerSlice.actions;

export default registerSlice.reducer

