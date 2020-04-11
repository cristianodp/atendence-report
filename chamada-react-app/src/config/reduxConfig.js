import React from "react";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";

import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

import firebase, { rrfConfig } from "./fbConfig";
import createReduxStore from "../store";

const store = createReduxStore();


const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

export function renderWithRedux(ui) {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>{ui}</Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
