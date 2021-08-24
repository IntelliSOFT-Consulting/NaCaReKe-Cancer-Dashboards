import { color } from "highcharts";
import React from "react";
import AppShadowDiv from "../../Layouts/AppShadowDiv/AppShadowDiv";

function CardForNumberData(props) {
  const { children, appShadowStyle } = props;
  // const {color} =appShadowStyle

  // console.log(appShadowStyle)
  return (
    <AppShadowDiv style={appShadowStyle}>
      <div style={{}}>
        <h4 style={{ color: "red" }}>{props.number}</h4>

        <div style={{ flex: 1 }}>
          <div style={{ textAlign: "right" }}>
            <span
              className="text-muted"
              style={{ textAlign: "right", fontSize: 13 }}
            >
              {props.title}
            </span>
          </div>
        </div>
      </div>
    </AppShadowDiv>
  );
}

export default CardForNumberData;
