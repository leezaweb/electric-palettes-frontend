import React from "react";
import { Card } from "semantic-ui-react";

export default class DeviceCard extends React.Component {
  render(props) {
    const {
      colors,
      decade,
      device_type,
      images,
      title_raw
    } = this.props.device;

    // const handleClick = e => {
    //   let id = e.target.dataset.id;
    //
    //   fetch(`http://lelectric-palettes-backend.herokuapp.com0/api/v1/devices/${id}`, {
    //     body: JSON.stringify(id),
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json"
    //     },
    //     method: "DELETE"
    //   }).then(resp => console.log(resp));
    // };

    let image = images.find(image => image.primary === true);

    // let card;

    // const addFlip = e => {
    //   // card = e.target.closest(".device-card");
    //   // card.classList.add("animated", "infinite", "flipInY");
    //   // removeFlip();
    // };

    // const removeFlip = () => {
    //   setTimeout(
    //     () => card.classList.remove("animated", "infinite", "flipInY"),
    //     1000
    //   );
    // };
    return (
      <div
        className="device-card"
        onClick={this.props.clickCard}
        style={{
          backgroundColor: "rgba(255, 255, 255, .1)",
          color: "white",
          fontWeight: "bold"
        }}
      >
        <div>
          {image ? (
            <div
              className="primary"
              style={{ backgroundImage: `url(${image.url})` }}
            />
          ) : null}
          <Card.Content>
            <Card.Header>{title_raw}</Card.Header>
            <Card.Meta>
              <div className="date">{decade}</div>
              <div>{device_type}</div>
            </Card.Meta>
            <Card.Description />
          </Card.Content>
          <Card.Content extra>
            <div>
              {colors
                ? colors.map(color => {
                    var spanStyles = {
                      width: `${100 / colors.length}%`,
                      backgroundColor: color.name,
                      display: "inline-block"
                    };
                    return (
                      <span key={color.name} style={spanStyles}>
                        &nbsp;
                      </span>
                    );
                  })
                : null}
            </div>

            {/*
                <button data-id={id} onClick={handleClick}>
                  delete
                </button>
              */}
          </Card.Content>
        </div>
      </div>
    );
  }
}
