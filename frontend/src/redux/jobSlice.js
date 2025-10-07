import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        bookmarks: [],
    },
    reducers: {
        // actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        addBookmark: (state, action) => {
            const job = action.payload
            // Safety check: initialize bookmarks array if missing
            if (!Array.isArray(state.bookmarks)) {
                state.bookmarks = [];
            }
            console.log(state.bookmarks)

            const alreadyBookmarked = state.bookmarks.find(item => item._id === job._id)
            if (!alreadyBookmarked) {
                state.bookmarks.push(job)
            }
        },
        removeBookmark: (state, action) => {
            const job = action.payload
            state.bookmarks = state.bookmarks.filter(item => item._id !== job._id)
        }
    }
});
export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    addBookmark,
    removeBookmark
} = jobSlice.actions;
export default jobSlice.reducer;