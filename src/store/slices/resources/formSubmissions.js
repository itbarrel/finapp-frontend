import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, resetAll } from "../../apiActions";

const slice = createSlice({
    name: "formSubmission",
    initialState: {
        list: [],
        completed: [],
        item: {},
        hasErrors: false
    },
    reducers: {
        all: (state, action) => {
            state.list = action.payload.data;
        },
        allCompleted: (state, action) => {
            state.completed = action.payload.data;
        },
        add: (state, action) => {
            // state.item = action.payload;
        },
        getSingle: (state, action) => {
            state.item = action.payload;
        },
        update: (state, action) => {
            console.log('update dynamic form store', action)
        },
        remove: (state, action) => {
            // eslint-disable-next-line no-negated-condition
            const update = state.list.filter((user) => (user.id !== state.update_item?.id ? user : null));
            state.list = update;
        },
        complete: (state, action) => {
            const { payload } = action
            state.completed.push(payload)
            state.list = state.list.filter((fs) => (fs.userId !== payload.userId && fs.formId !== payload.formId));
        },
        current_item: (state, action) => {
            state.update_item = action.payload;
        },
        failed: (state) => {
            state.hasErrors = true;
            state.item = {}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetAll, (state) => {
            state.list = [];
            state.item = {};
            state.completed = [];
            state.hasErrors = false
        });
    },
});

export const { all, getSingle, add, update, remove, current_item, complete, allCompleted, failed } = slice.actions;

export const submitFormSubmission = (data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: "v1/formSubmissions",
            method: "post",
            data,
            onSuccess: add.type,
            onError: failed.type,
        })
    );
};

export const getFormSubmission = (data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: "v1/formSubmissions/single",
            method: "get",
            data,
            onSuccess: getSingle.type,
            onError: failed.type,
            notify: false
        })
    );
};

export const getCompletedFormSubmissions = (data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: "v1/formSubmissions",
            method: "get",
            data,
            onSuccess: allCompleted.type,
            onError: failed.type,
        })
    );
};

export const getFormSubmissions = (data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: "v1/formSubmissions",
            method: "get",
            data,
            onSuccess: all.type,
            onError: failed.type,
        })
    );
};

export const completeFormSubmission = (data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: "v1/formSubmissions/complete",
            method: "post",
            data,
            onSuccess: complete.type,
            onError: failed.type,
        })
    );
};


export default slice.reducer;
