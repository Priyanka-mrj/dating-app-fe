import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    profileDetail: null,
    isLoading: false
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        startFetchingSuggestion: (state, action) => {
            state.isLoading = true,
            state.suggestionList = []
        },
        endFetchingSuggestion: (state, action) => {
           // state.userData = action.payload
            state.isLoading = false;
            state.suggestionList = action.payload
        }
    },
});

// Action creators are generated for each case reducer function
export const { startFetchingSuggestion, endFetchingSuggestion } = profileSlice.actions;

export default profileSlice.reducer

