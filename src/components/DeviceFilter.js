import React from "react";
import { Label, Icon } from "semantic-ui-react";

export default class DeviceFilter extends React.Component {
  render() {
    let colors = this.props.colors.filter(color => {
      let bool = color.devices ? color.devices.length : 0;
      return bool;
    });
    return (
      <div className="deviceFilter">
        <Label.Group onClick={this.props.handleType}>
          <Label as="span" active={this.props.type === "calculator"}>
            <Icon name="calculator" />
            calculator
          </Label>
          <Label as="span" active={this.props.type === "camera"}>
            <Icon name="camera retro" />
            camera
          </Label>
          <Label as="span" active={this.props.type === "computer"}>
            <Icon name="laptop" />
            computer
          </Label>
          <Label as="span" active={this.props.type === "phone"}>
            <Icon name="phone" />
            telephone
          </Label>
          <Label as="span" active={this.props.type === "recorder"}>
            <Icon name="volume up" />
            audio
          </Label>
          <Label as="span" active={this.props.type === "television"}>
            <Icon name="television" />
            television
          </Label>
          <Label as="span" active={this.props.type === "typewriter"}>
            <Icon name="keyboard" />
            typewriter
          </Label>
        </Label.Group>
        <Label.Group onClick={this.props.handleDecade}>
          <Label as="span" active={this.props.decade === 1990}>
            1990
          </Label>
          <Label as="span" active={this.props.decade === 1980}>
            1980
          </Label>
          <Label as="span" active={this.props.decade === 1970}>
            1970
          </Label>
          <Label as="span" active={this.props.decade === 1960}>
            1960
          </Label>
          <Label as="span" active={this.props.decade === 1950}>
            1950
          </Label>
          <Label as="span" active={this.props.decade === 1940}>
            1940
          </Label>
          <Label as="span" active={this.props.decade === 1930}>
            1930
          </Label>
          <Label as="span" active={this.props.decade === 1920}>
            1920
          </Label>
        </Label.Group>

        <Label.Group onClick={this.props.handleColor} className="colorFilter">
          {colors.map(color => (
            <Label
              as="span"
              color={null}
              className={
                this.props.selectedColors.includes(color.name) ? "active" : null
              }
              key={color.id}
              circular
              style={{ backgroundColor: "transparent" }}
            >
              <span
                style={{
                  backgroundColor: color.name,
                  minWidth: "2em",
                  minHeight: "2em",
                  borderRadius: "500rem",
                  display: "block"
                }}
              />
            </Label>
          ))}
        </Label.Group>
      </div>
    );
  }
}
