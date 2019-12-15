import React from "react";

import { NavBar } from ".";
import { NavLink } from "react-router-dom";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<NavBar />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavBar user={false} />);
  });
  it("should an exact login and register buttons in if unauthenticated", () => {
    expect(
      wrapper.contains(
        <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
      )
    ).toEqual(true);
  });
  it("should an exact logout and dashboard button if authenticated", () => {
    wrapper.setProps({ user: true });
    expect(
      wrapper.contains(
        <NavLink className="nav-item nav-link" to="/logout">
          Logout
        </NavLink>
      )
    ).toEqual(true);
  });
});
