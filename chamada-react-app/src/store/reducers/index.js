import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import participants from "./participants";
import schedule from "./schedules";
import errors from "./errors";
import authReducer from './authReducer'

export default combineReducers({
  auth: authReducer,
  participants,
  schedule,
  errors,
  loadingBar: loadingBarReducer,
  firestore : firestoreReducer,
  firebase: firebaseReducer,
});