import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "notification",
  initialState: 60, // [], {}, true, string or int etc
  reducers: {
    // action:  action handler
    // action:  (state, action) => {}
    // action:  (state, action) => {
    //     const { prop1, prop2 } = action.payload
    // }
    countInc: (count, action) => {
      return (count += action.payload.value);
    },
    countDec: (count, action) => {
      return (count -= action.payload.value);
    },
  },
});

export const { countInc, countDec } = slice.actions;
export default slice.reducer;
