import React from "react";
import { Menu } from "semantic-ui-react";
import { withRouter, NavLink } from "react-router-dom";

class DeviceMenu extends React.Component {
  render() {
    return (
      <Menu pointing secondary>
        <Menu.Item
          name="home"
          active={this.props.activeItem === "home"}
          as={NavLink}
          to="/"
          onClick={() => this.props.handleMenu("home")}
        />

        <Menu.Item
          position="right"
          name="color graph"
          active={this.props.activeItem === "color graph"}
          as={NavLink}
          to="/color-graph"
          onClick={() => this.props.handleMenu("color graph")}
        />
      </Menu>
    );
  }
}
export default withRouter(DeviceMenu);
