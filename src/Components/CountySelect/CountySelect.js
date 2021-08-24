import React from "react";
import { KENYA_DHIS2_ID } from "../../Constants/Variables";

function CountySelect(props) {
  const { values,handleChange,value,ouSelected } = props;
  return (
    <div>
      <select value={value} onChange={(e)=>handleChange(e.target.value)} class="form-select" aria-label="Default select example">
      <option value="">Select County</option>
      {values.filter((val, index) => {
        return val.id === KENYA_DHIS2_ID
        }).map((val2,index)=>{
          return <option key={index} value={val2.id}>{val2.name}</option>;

        })
        
        }
        {values.filter((val, index) => {
        return val.id !== KENYA_DHIS2_ID
        }).sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          }).map((val, index) => {
          return <option key={index} value={val.id}>{val.name}</option>;
        })}
      </select>
    </div>
  );
}

export default CountySelect;
