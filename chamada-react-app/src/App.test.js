import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { renderWithRedux } from "./config/reduxConfig";

describe("App Tests Component", function() {
  it("renders without crashing", async done => {
    const div = document.createElement("div");
    ReactDOM.render(renderWithRedux(<App />), div);
    ReactDOM.unmountComponentAtNode(div);
    done();
  }, 10000);

  afterAll(() => setTimeout(() => process.exit(), 1000));
});
