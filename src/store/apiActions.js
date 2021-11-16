import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/callBegan");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");
export const resetAll = createAction("operation/resetAll");
// dynamic Form
export const dynamicFormApiCallBegan = createAction("dynamicForm/api/callBegan");
export const dynamicFormApiCallSuccess = createAction("dynamicForm/api/callSuccess");
export const dynamicFormApiCallFailed = createAction("dynamicForm/api/callFailed");
