import React from "react";
import { Grid, Label } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class DeviceSpec extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: null,
      primary: "".url,
      id: this.props.match.params.id,
      colors: null
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/devices/${this.state.id}`)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          device: json,
          colors: json.colors.sort(
            (a, b) => a.devices.length - b.devices.length
          ),
          primary: json.images.find(image => image.primary === true).url
        });
      });
    document.querySelector(".menu a:first-of-type").classList.remove("active");
  }

  switchPrimary = e => {
    let temp = `url(${this.state.primary})`;
    this.setState({
      primary: e.target.style.backgroundImage
        .replace('url("', "")
        .replace('")', "")
    });
    e.target.style.backgroundImage = temp;
  };
  colors = [];
  handleChange = e => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.colors = value;
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ colors: this.colors });

    this.props.updateColor(this.colors, this.state.id);
  };

  render() {
    console.log(this.state.colros);
    return (
      <div>
        {this.state.device ? (
          <div>
            {/*
            <Label
              as="span"
              active={true}
              color={null}
              key={color.id}
              circular

            />*/}
            <form onSubmit={this.handleSubmit}>
              <select name="colors" multiple onChange={this.handleChange}>
                {this.props.colors.map(color => (
                  <option
                    key={color.name}
                    style={{
                      zIndex: 99,
                      position: "relative",
                      backgroundColor: color.name,
                      color: color.name
                    }}
                    value={color.name}
                  >
                    &nbsp;
                  </option>
                ))}
              </select>
              <br />
              <button>submit</button>
            </form>
            <div className="ui internally celled grid">
              <Grid.Row>
                <Grid.Column width={6}>
                  <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}
                    transitionAppear={true}
                    transitionAppearTimeout={1000}
                    className="ui internally celled grid"
                  >
                    <Grid.Row>
                      <Grid.Column width={16}>
                        <img
                          alt={this.state.device.title_raw}
                          src={this.state.primary}
                          style={{ width: `100%` }}
                        />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column width={16}>
                        <p>{this.state.device.date}</p>
                        <p>{this.state.device.designer}</p>
                        <p>{this.state.device.medium}</p>
                        <p>{this.state.device.dimensions}</p>
                      </Grid.Column>
                    </Grid.Row>
                  </ReactCSSTransitionGroup>
                </Grid.Column>
                <Grid.Column width={8}>
                  <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={6000}
                    transitionLeaveTimeout={6000}
                    transitionAppear={true}
                    transitionAppearTimeout={6000}
                    className="ui internally celled grid"
                  >
                    <Grid.Row>
                      <Grid.Column width={16}>
                        <h1>{this.state.device.title_raw}</h1>
                        <p className="galleryText">
                          {this.state.device.gallery_text
                            ? this.state.device.gallery_text
                            : this.state.device.description}
                        </p>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column width={16}>
                        <div>
                          {this.state.device.images
                            .filter(image => image.primary !== true)
                            .map((image, id) => (
                              <span
                                onClick={this.switchPrimary}
                                key={id}
                                className="secondary"
                                style={{
                                  width: `calc(${100 /
                                    (this.state.device.images.length -
                                      1)}% - 12px)`,
                                  backgroundImage: `url(${image.url})`,
                                  display: "inline-block",
                                  height: 250 + "px",
                                  cursor: "pointer",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center center"
                                }}
                              >
                                &nbsp;
                              </span>
                            ))}
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </ReactCSSTransitionGroup>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={16}>
                  <div>
                    {this.state.colors
                      ? this.state.colors.map((col, id) => {
                          var spanStyles = {
                            width: `${100 / this.state.colors.length}%`,
                            backgroundColor: col.name,
                            display: "inline-block"
                          };
                          return (
                            <span key={id} style={spanStyles}>
                              &nbsp;
                            </span>
                          );
                        })
                      : null}
                  </div>
                </Grid.Column>
              </Grid.Row>
            </div>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}

export default withRouter(DeviceSpec);
