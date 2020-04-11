import React from "react";
import Checker from "./checker";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";

describe("Checker Tests Component", function() {
  it("Should render without crashing", async done => {
    const div = document.createElement("div");
    ReactDOM.render(<Checker />, div);
    ReactDOM.unmountComponentAtNode(div);
    done();
  }, 10000);

  test("Should Match Snapshot", async done => {
    const component = renderer.create(<Checker />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  }, 10000);
});
