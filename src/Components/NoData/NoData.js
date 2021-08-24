import React from "react";

function NoData() {
  return (
    <div
      style={{
        padding: 10,
        minHeight: 400,
        alignItems: "center",
        flex: 1,
        flexDirection:'column',
        justifyContent: "center",
        display: "flex",
      }}
    >
      <h4> <img height="40"  src="https://img.icons8.com/cotton/64/000000/graph--v2.png"/></h4>
      <br></br>
      <h4>
      No graph to show
      </h4>
    </div>
  );
}

export default NoData;
