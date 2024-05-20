import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    suggestionList: [],
    isLoading: false
};

export const homeSlice = createSlice({
    name: 'home',
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
export const { startFetchingSuggestion, endFetchingSuggestion } = homeSlice.actions;

export default homeSlice.reducer

