import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    userData: null,
    loggedInUserProfile: null,
    isLoggedInUserProfileLoading: false
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload
        },
        setLoginFailure: (state, action) => {
            state.userData = action.payload;
            state.isLoggedIn = false;
        },
        setLogout: (state, action) => {
            state.userData = action.payload;
            state.isLoggedIn = false;
        },
        setLoggedInUserProfile: (state, action) => {
            state.loggedInUserProfile = action.payload;
        },
        setIsLoggedInUserProfileLoading: (state, action) => {
            state.isLoggedInUserProfileLoading = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setLogin, setLogout, setLoginFailure, setLoggedInUserProfile, setIsLoggedInUserProfileLoading} = loginSlice.actions;

export default loginSlice.reducer

