import React from "react";
import Schedules from "./schedules";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import { renderWithRedux } from "../../config/reduxConfig";

describe("Schedule Tests Component", function() {
  it("Should render without crashing", async done => {
    const div = document.createElement("div");
    act(() => {
      ReactDOM.render(renderWithRedux(<Schedules />), div);
    });
    ReactDOM.unmountComponentAtNode(div);
    done();
  }, 10000);

  test("Should Match Snapshot", async done => {
    let component
    act(() => {
      component = renderer.create(renderWithRedux(<Schedules />));
    });
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  }, 10000);
});
