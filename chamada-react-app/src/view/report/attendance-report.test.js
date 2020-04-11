import React from "react";
import AttendanceReport from "./attendance-report";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import { renderWithRedux } from "../../config/reduxConfig";

describe("Attendance Report Tests Component", function() {
  it("Should render without crashing", async done => {
    const div = document.createElement("div");
    act(() => {
      ReactDOM.render(renderWithRedux(<AttendanceReport />), div);
      ReactDOM.unmountComponentAtNode(div);
    });
    done();
  }, 10000);

  test("Should Match Snapshot", async done => {
    const component = renderer.create(renderWithRedux(<AttendanceReport />));

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  }, 10000);
});
