import React, { useContext } from "react";
import AppRow from "../../Layouts/AppRow/AppRow";

import { OrgUnitsContext } from "../../Contexts/OrgUnitsContext/OrgUnitsContext";
// import SelectPeriod from "../SelectPeriod/SelectPeriod";
import CountySelect from "../CountySelect/CountySelect";
import SubCountySelect from "../SubCountySelect/SubCountySelect";
import WardSelect from "../WardSelect/WardSelect";
import SelectPeriod from "../SelectPeriod/SelectPeriod";
import { periods } from "../../Constants/periods";

function SubdivisionFilter() {
  const {
    counties,
    subCounties,
    wards,
    period,
    period2,
    ouSelected,
    countySelected,
    subCountySelected,
    wardSelected,

    getCounty,
    getSubCounty,
    getWard,
    handleCountyChange,
    handlesubCountieselect,
    handleWardChange,
    SetOuSelected,
    handlePeriodChange,
    handlePeriod1Change,
    handlePeriod2Change,
  } = useContext(OrgUnitsContext);

  return (
    <div>
      <div class="row" id="select_filters">
        <AppRow>
          <div class="col-sm-2">
            <CountySelect
            ouSelected={ouSelected}
              value={countySelected}
              handleChange={handleCountyChange}
              values={counties}
            />
          </div>
          <div class="col-sm-2">
            <SubCountySelect
              value={subCountySelected}
              handleChange={handlesubCountieselect}
              values={subCounties}
            />
          </div>
          {
            subCountySelected !== countySelected&&
            <div class="col-sm-2">
            <WardSelect
              value={wardSelected}
              handleChange={handleWardChange}
              values={wards}
            />
          </div>
          }
         

          <div class="col-sm-2">
            <SelectPeriod handleChange={handlePeriodChange} values={periods} />
          </div>
        </AppRow>
      </div>
    </div>
  );
}

export default SubdivisionFilter;
