import React from "react";

function WardSelect(props) {
  const { values, handleChange ,value} = props;
  return (
    <div>
      <select
      value={value}
        onChange={(e) => handleChange(e.target.value)}
        class="form-select"
        aria-label="Default select example"
      >
        <option value="">Select Ward</option>

        {values.map((val, index) => {
          return (
            <option key={index} value={val.id}>
              {val.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default WardSelect;
