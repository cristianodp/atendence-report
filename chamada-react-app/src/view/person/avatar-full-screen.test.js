import React from "react";
import AvatarFullScreen from "./avatar-full-screen";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";


import { renderWithRedux } from "../../config/reduxConfig";

describe("Avatar full screen Tests Component", function() {
  const mockPerson = {
    id: 123,
    firstName: "Jhon",
    lastName: "Due",
    avatar: "https://image.com"
  };
  const mockOpen = false;

  it("Should render without crashing", async done => {
    const div = document.createElement("div");
    act(() => {
      ReactDOM.render(
        renderWithRedux(
          <AvatarFullScreen open={mockOpen} person={mockPerson} />
        ),
        div
      );
    });
   // act(() => {
      ReactDOM.unmountComponentAtNode(div);
   // });

    done();
  }, 10000);

  test("Should Match Snapshot", async done => {
    const component = renderer.create(renderWithRedux(<AvatarFullScreen open={mockOpen} person={mockPerson} />))
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  }, 10000);
});
