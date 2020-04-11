import React from "react";
import SearchAppBar from "./app-tool-bar";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";

describe("App Tool Bar Tests Component", function() {
  it("Should render without crashing", async done => {
    const div = document.createElement("div");
    ReactDOM.render(<SearchAppBar />, div);
    ReactDOM.unmountComponentAtNode(div);
    done();
  }, 10000);

  test("Should Match Snapshot", async done => {
    const component = renderer.create(<SearchAppBar />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  }, 10000);
});
