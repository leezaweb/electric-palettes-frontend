import React from "react";
import DeviceCard from "./DeviceCard";
import { withRouter } from "react-router-dom";
import Waypoint from "react-waypoint";
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
    // this.props.handleMenu("home");
  }

  loadMore = () => {
    this.props.loadMore();
  };

  renderWaypoint = () => {
    if (
      !this.props.filtered &&
      !this.props.loading &&
      this.props.devices.length >= this.props.page * 8
    ) {
      return <Waypoint onEnter={this.loadMore} threshold={0} />;
    }
  };

  render() {
    return (
      <section className="deviceList">
        <ReactCSSTransitionGroup
          transitionName="fadeup"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}
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
          {this.renderWaypoint()}
        </ReactCSSTransitionGroup>
      </section>
    );
  }
}
export default withRouter(DeviceList);
