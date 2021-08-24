import React from "react";

function SelectPeriod(props) {
  const { values, handleChange } = props;
  return (
    <div>
      <select
        onChange={(e) => handleChange(e.target.value)}
        class="form-select"
        aria-label="Default select example"
      >
        <option value="">Select Period </option>

        {values.map((val, index) => {
          return (
            <option key={index} value={val.val}>
              {val.period}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectPeriod;
