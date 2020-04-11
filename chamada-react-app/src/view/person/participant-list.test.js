import React from "react";
import ParticipantList from "./participant-list";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";

import { renderWithRedux } from "../../config/reduxConfig";

describe("Participant List Tests Component", function() {
  it("Should render without crashing", async done => {
    const div = document.createElement("div");
    ReactDOM.render(renderWithRedux(<ParticipantList />), div);
    ReactDOM.unmountComponentAtNode(div);
    done();
  }, 10000);

  test("Should Match Snapshot", async done => {
    const component = renderer.create(renderWithRedux(<ParticipantList />));

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  }, 10000);
});
