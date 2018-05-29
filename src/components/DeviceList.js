import React from "react";
import DeviceCard from "./DeviceCard";
import { withRouter } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class DeviceList extends React.Component {
  handleClick = (device, e) => {
    let card = e.target.closest(".device-card");
    card.classList.add("animated", "infinite", "flipInY");
    setTimeout(() => {
      this.props.history.push(`/device/${device.id}`);
    }, 1000);
  };
  componentDidMount() {
    this.props.handleMenu("home");
  }

  render() {
    return (
      <section className="deviceList">
        <ReactCSSTransitionGroup
          transitionName="fadeup"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={600}
        >
          {this.props.devices.map((device, id) => (
            <DeviceCard
              key={id}
              device={device}
              clickCard={e => {
                this.handleClick(device, e);
              }}
            />
          ))}
        </ReactCSSTransitionGroup>
      </section>
    );
  }
}
export default withRouter(DeviceList);
