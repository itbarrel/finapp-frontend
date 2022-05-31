import { combineReducers } from "@reduxjs/toolkit";
import {
  Account,
  User,
  Role,
  Departments,
  Incidents,
  Task,
  DynamicForm
} from "../slices/resources";

export default combineReducers({
  Account,
  User,
  Role,
  Departments,
  Incidents,
  Task,
  DynamicForm
});
