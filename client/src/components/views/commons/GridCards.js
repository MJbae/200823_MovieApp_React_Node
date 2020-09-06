import React from "react";
import { Col } from "antd";

function GridCards(props) {
  if (props.landingPage) {
    return (
      // lg 시, 4열 배치(6*4), md 시, 3열 배치(8*3), xs 시 1열 배치(24*1)
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{ width: "100%", height: "320px" }}
              src={props.image}
              alt={props.movieName}
            />
          </a>
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "320px" }}
            src={props.image}
            alt={props.characterName}
          />
        </div>
      </Col>
    );
  }
}

export default GridCards;
