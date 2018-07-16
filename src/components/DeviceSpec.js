import React from "react";
import { Grid } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Parallax } from "react-spring";

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
    fetch(
      `http://electric-palettes-backend.herokuapp.com/api/v1/devices/${
        this.state.id
      }`
    )
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
    console.log(this.state);
    return (
      <Parallax
        className="container"
        ref={ref => (this.parallax = ref)}
        pages={2}
        horizontal
        scrolling={false}
      >
        <Parallax.Layer
          offset={0}
          speed={0.1}
          onClick={e => {
            console.log(e.target.tagName);
            if (e.target.tagName !== "OPTION" && e.target.tagName !== "SPAN")
              this.parallax.scrollTo(1);
          }}
        >
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
                 {/*<form onSubmit={this.handleSubmit}>
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
                </form>*/}
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
                                      maxWidth: "250px",
                                      backgroundImage: `url(${image.url})`,
                                      display: "inline-block",
                                      height: "250px",
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
        </Parallax.Layer>
        <Parallax.Layer
          offset={1}
          speed={0.1}
          onClick={() => this.parallax.scrollTo(0)}
        >
          {this.state.device ? (
            <div
              style={{
                backgroundImage: `url(${this.state.primary})`,
                cursor: "pointer",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                height: "90%",
                width: "85%",
                padding: "3em",
                position: "relative"
              }}
            >
              <div
                style={{
                  fontSize: "9em",
                  lineHeight: 1,
                  color: "rgba(255,255,255,.7)",
                  textShadow: "3px 3px 3px rgba(0,0,0,.3)",
                  textTransform: "uppercase",
                  fontWeight: "1000",
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontFamily: '"Arial Black", Gadget, sans-serif'
                }}
              >
                {this.state.device.title_raw}
              </div>
            </div>
          ) : null}
        </Parallax.Layer>
      </Parallax>
    );
  }
}

export default withRouter(DeviceSpec);
