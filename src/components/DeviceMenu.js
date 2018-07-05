import React from "react";
import { Menu } from "semantic-ui-react";
import { withRouter, NavLink } from "react-router-dom";

class DeviceMenu extends React.Component {
  render() {
    console.log(this.props.activeItem);
    return (
      <Menu pointing secondary>
        <Menu.Item name="home" active={false} as={NavLink} to="/" />

        <Menu.Item
          position="right"
          name="color graph"
          as={NavLink}
          to="/color-graph"
        />
      </Menu>
    );
  }
}
export default withRouter(DeviceMenu);
