import { createContext, useEffect, useState } from "react";
import { justFetch } from "../../Services/JustFetchService";
import { APP_URL, KENYA_DHIS2_ID } from "./../../Constants/Variables";
export const OrgUnitsContext = createContext();

export const OrgUnitsContextProvider = (props) => {
  const [period, SetPeriod] = useState("LAST_12_MONTHS");
  const [period2, SetPeriod2] = useState("LAST_12_MONTHS");

  const { children } = props;

  const [counties, SetCounties] = useState([]);
  const [subCounties, SetsubCounties] = useState([]);
  const [wards, Setwards] = useState([]);
  const [countySelected, SetCountySelected] = useState("");
  const [subCountySelected, SetSubCountySelected] = useState("");
  const [wardSelected, SetWardSelected] = useState("");

  const [ouSelected, SetOuSelected] = useState(KENYA_DHIS2_ID);

  const handlePeriodChange = (val) => {
    console.log(val);

    SetPeriod2(val);
  };

  const getCounty = (countryId = KENYA_DHIS2_ID) => {
    justFetch(
      `
      ${APP_URL}/organisationUnits/${countryId}.json?includeChildren=true&fields=id,name
      `,
      {}
    )
      .then((res) => {
        console.log(res.organisationUnits);
        SetCounties(res.organisationUnits);
      })
      .catch((e) => {});
  };

  const getSubCounty = (countyID) => {
    justFetch(
      `
      ${APP_URL}/organisationUnits/${countyID}.json?includeChildren=true&fields=id,name
      `,
      {}
    )
      .then((res) => {
        // console.log(res.organisationUnits);
        SetsubCounties(res.organisationUnits);
      })
      .catch((e) => {});
  };

  const getWard = (subCountyID) => {
    justFetch(
      `
      ${APP_URL}/organisationUnits/${subCountyID}.json?includeChildren=true&fields=id,name
        `,
      {}
    )
      .then((res) => {
        //   console.log(res);
        Setwards(res.organisationUnits);
      })
      .catch((e) => {});
  };

  const handlePeriod1Change = (val) => {
    if (val !== "") {
      SetPeriod(val);
    }
  };

  const handlePeriod2Change = (val) => {
    if (val !== "") {
      SetPeriod2(val);
    }
  };

  const handleCountyChange = (val) => {
    Setwards([]);
    SetsubCounties([]);
    if (val !== "") {
      SetCountySelected(val);
      SetSubCountySelected("");
      SetWardSelected("");
      SetOuSelected(val);

      if (countySelected !== val) {
        getSubCounty(val);
      }
    }
  };

  const handlesubCountieselect = (val) => {
    if (val !== "") {
      SetSubCountySelected(val);

      SetOuSelected(val);

      if (val !== countySelected) {
        getWard(val);
      }
    }
  };

  const handleWardChange = (val) => {
    // console.log(val)

    if (val !== "") {
      SetWardSelected(val);
      SetOuSelected(val);
    }
  };

  useEffect(() => {
    //   getSubCounty()
    getCounty();
    return () => {
      //   cleanup
    };
  }, []);
  return (
    <OrgUnitsContext.Provider
      value={{
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
      }}
    >
      {children}
    </OrgUnitsContext.Provider>
  );
};
