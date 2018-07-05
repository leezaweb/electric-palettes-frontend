import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DeviceFilter from "./components/DeviceFilter";
import DeviceList from "./components/DeviceList";
import DeviceSpec from "./components/DeviceSpec";
import DeviceMenu from "./components/DeviceMenu";
import ColorChart from "./components/ColorChart";
import "./App.css";
import { Grid } from "semantic-ui-react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      deviceColors: null,
      activeItem: null,
      detail: false,
      loading: false,
      filtered: false,
      devices: [],
      filteredDevices: [],
      selectedColors: [],
      colors: [],
      decade: "",
      type: "",
      page: 1
    };
    this.selectedColors = this.state.colors;
  }

  componentDidMount() {
    fetch("http://lelectric-palettes-backend.herokuapp.com1/api/v1/devices")
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          filteredDevices: json,
          devices: json
        });
      });
    fetch("http://lelectric-palettes-backend.herokuapp.com1/api/v1/colors")
      .then(resp => resp.json())
      .then(json =>
        this.setState(
          {
            colors: json,
            selectedColors: json
              .filter(color => color.devices.length)
              .map(color => color.name)
          },
          () => (this.selectedColors = this.state.selectedColors)
        )
      );
  }

  fetchAll = () => {
    fetch("http://lelectric-palettes-backend.herokuapp.com1/api/v1/devices/all")
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          devices: json
        });
      });
  };

  selectedDecades = [1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990];

  handleDecade = e => {
    this.fetchAll();
    this.setState({ filteredDevices: [] });
    this.selectedDecades = [];
    let decade = parseInt(e.target.closest("span").innerText, 10);
    this.selectedDecades.includes(decade)
      ? this.selectedDecades.splice(this.selectedDecades.indexOf(decade), 1)
      : this.selectedDecades.push(decade);

    let deviceByDecade = this.state.devices.filter(device =>
      this.selectedDecades.includes(device.decade)
    );
    setTimeout(
      () =>
        this.setState({
          filtered: true,
          decade: decade,
          type: null,
          selectedColors: this.state.colors
            .filter(color => color.devices.length)
            .map(color => color.name),
          filteredDevices: this.shuffle(deviceByDecade)
        }),
      1
    );
  };

  handleColor = e => {
    this.fetchAll();
    let circle = e.target.closest(".circular");
    circle.classList.toggle("active");
    let color = circle.children[0].style.backgroundColor;
    let ink = document.querySelector(".ink");
    ink.classList.remove("animate");
    ink.style.backgroundColor = color;
    ink.style.left = `${e.clientX / 2}px`;
    ink.style.top = `-${e.clientY / 2}px`;
    setTimeout(() => ink.classList.add("animate"), 1);
    this.selectedColors.includes(color)
      ? this.selectedColors.splice(this.selectedColors.indexOf(color), 1)
      : this.selectedColors.push(color);

    let deviceByColor = this.state.devices.filter(device =>
      device.colors.find(color =>
        this.state.selectedColors.includes(color.name)
      )
    );

    setTimeout(
      () =>
        this.setState({
          filtered: true,
          decade: null,
          type: null,
          selectedColors: this.selectedColors,
          filteredDevices: this.shuffle(deviceByColor)
        }),
      1
    );
  };

  selectedTypes = [
    "calculator",
    "camera",
    "computer",
    "phone",
    "recorder",
    "television",
    "typewriter"
  ];

  handleType = e => {
    this.fetchAll();
    this.setState({ filteredDevices: [] });
    this.selectedTypes = [];
    let type = e.target.closest("span").innerText;
    this.selectedTypes.includes(type)
      ? this.selectedTypes.splice(this.selectedTypes.indexOf(type), 1)
      : this.selectedTypes.push(type);

    let deviceByType =
      type === "audio"
        ? this.state.devices.filter(device =>
            this.selectedTypes.find(type =>
              device.device_type.match(
                new RegExp(`\\b(radio|turntable|speaker)\\b`, "gi")
              )
            )
          )
        : this.state.devices.filter(device =>
            this.selectedTypes.find(type =>
              device.device_type.match(new RegExp(`\\b(${type})\\b`, "gi"))
            )
          );
    setTimeout(
      () =>
        this.setState({
          filtered: true,
          decade: null,
          type: type,
          selectedColors: this.state.colors.map(color => color.name),
          filteredDevices: this.shuffle(deviceByType)
        }),
      1
    );
  };

  handleMenu = location => {
    console.log(location);
    this.setState({ activeItem: location });
  };

  shuffle = array => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  updateColor = (colors, id) => {
    let data = { colors: colors.join(","), id: id };
    fetch(`http://lelectric-palettes-backend.herokuapp.com1/api/v1/devices/${id}`, {
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "PATCH"
    }).then(resp => console.log(resp));
    this.setState({ deviceColors: colors });
  };

  loadMore = () => {
    this.toggleLoading();
    fetch(`http://lelectric-palettes-backend.herokuapp.com1/api/v1/devices?load=${1 + this.state.page}`)
      .then(resp => resp.json())
      .then(json =>
        this.setState({
          filteredDevices: json,
          devices: json,
          loading: false,
          page: 1 + this.state.page
        })
      );
  };

  toggleLoading = () => {
    this.setState({
      loading: true
    });
  };

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}
                transitionAppear={true}
                transitionAppearTimeout={1000}
              >
                <DeviceMenu
                  activeItem={this.state.activeItem}
                  handleMenu={this.handleMenu}
                />
                <Grid>
                  <Grid.Row columns={1}>
                    <Grid.Column>
                      <div>
                        <DeviceFilter
                          handleDecade={this.handleDecade}
                          handleType={this.handleType}
                          handleColor={this.handleColor}
                          colors={this.state.colors}
                          decade={this.state.decade}
                          type={this.state.type}
                          selectedColors={this.state.selectedColors}
                        />
                        <DeviceList
                          handleMenu={this.handleMenu}
                          devices={this.state.filteredDevices}
                          detailView={this.detailView}
                          loading={this.state.loading}
                          loadMore={this.loadMore}
                          toggleLoading={this.toggleLoading}
                          page={this.state.page}
                          filtered={this.state.filtered}
                        />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </ReactCSSTransitionGroup>
            </Route>
            <Route exact path="/device/:id">
              <div>
                <DeviceMenu activeItem={null} handleMenu={this.handleMenu} />
                <DeviceSpec
                  device={this.state.selectedDevice}
                  colors={this.state.colors}
                  updateColor={this.updateColor}
                />
              </div>
            </Route>

            <Route exact path="/color-graph">
              <div>
                <DeviceMenu activeItem={null} handleMenu={this.handleMenu} />
                <ColorChart colors={this.state.colors} />
              </div>
            </Route>
            <Route path="*" render={() => "404 Not Found"} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
