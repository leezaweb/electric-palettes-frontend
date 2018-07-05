import React from "react";
// import d3 from "d3";
import { HorizontalBar, Bar, Line } from "react-chartjs-2";

var LineChart = require("react-chartjs").Line;

export default class ColorChart extends React.Component {
  componentDidMount() {
    // colors = this.props.colors.filter(color => color.devices);
    // if (this.props.colors) {
    //   var bardata = this.props.colors
    //     .filter(color => color.devices)
    //     .map(color => color.device_count);
    //   var height = 400,
    //     width = 600,
    //     barWidth = 5,
    //     barOffset = 5;
    //
    //   var yScale = d3.scale
    //     .linear()
    //     .domain([0, 36, d3.max(bardata)])
    //     .range([0, height]);
    //
    //   var colors = d3.scale
    //     .linear()
    //     .domain([0, d3.max(bardata)])
    //     .range(
    //       this.props.colors
    //         .filter(color => color.devices)
    //         .map(color => color.name)
    //     );
    //
    //   d3
    //     .select("#viz")
    //     .append("svg")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .selectAll("rect")
    //     .data(bardata)
    //     .enter()
    //     .append("rect")
    //     .style("fill", colors)
    //     .attr("width", barWidth)
    //     .attr("height", function(d) {
    //       return yScale(d);
    //     })
    //     .attr("x", function(d, i) {
    //       return i * (barWidth + barOffset);
    //     })
    //     .attr("y", function(d) {
    //       return height - yScale(d);
    //     });
    // }
  }

  render() {
    let colors = this.props.colors
      .filter(color => color.devices.length)
      .sort((a, b) => b.device_count - a.device_count);

    let bardata = colors.map(color => color.device_count);

    const data = {
      labels: colors.map(color => color.name),
      datasets: [
        {
          label: "Color Occurence",
          backgroundColor: colors.map(color => color.name),
          data: bardata
        }
      ]
    };

    console.log(colors);
    return (
      <div>
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            minHeight: "900px"
          }}
        >
          <HorizontalBar
            data={data}
            options={{
              maintainAspectRatio: false,
              scales: {
                xAxes: [
                  {
                    display: true,
                    scaleLabel: {
                      display: true,
                      fontColor: "rgb(255, 255, 255)"
                    }
                  }
                ],
                yAxes: [
                  {
                    display: true,
                    scaleLabel: {
                      display: true,
                      fontColor: "rgb(255, 255, 255)"
                    }
                  }
                ]
              },
              legend: {
                display: true,
                labels: {
                  fontColor: "rgb(255, 255, 255)"
                }
              }
            }}
          />
        </div>
        <div id="viz" />
      </div>
    );
  }
}
