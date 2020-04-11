import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

import { renderWithRedux } from "./config/reduxConfig";

ReactDOM.render(renderWithRedux(<App />), document.getElementById("root"));
serviceWorker.unregister();
