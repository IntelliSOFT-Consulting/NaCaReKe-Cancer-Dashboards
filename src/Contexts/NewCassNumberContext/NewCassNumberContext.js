import { createContext, useState, useEffect, useContext } from "react";
import {
  APP_URL,
  CANCER_CODE,
  GENDERS,
  KENYA_DHIS2_ID,
  POPULATION_FEMALE,
  POPULATION_MALE,
} from "../../Constants/Variables";
import { justFetch } from "../../Services/JustFetchService";

import {
  convertExponentialToNumber,
  createGraphData,
  getCancerName,
  getCancerTypesFromDataWithCases,
  getDataB,
  getRowsFromMaxCases,
  getRowsFromMaxCasesBothGenders,
  getToptenCancerNames,
} from "../../Utils/Utils";
import { OrgUnitsContext } from "../OrgUnitsContext/OrgUnitsContext";
export const NewCasesNumberContext = createContext();

export const NewCasesNumberContextProvider = (props) => {
  const { ouSelected, period2, ouLevel, countySelected } =
    useContext(OrgUnitsContext);

  const [dataPeFemale, SetDataPe] = useState([]);
  const [datadxFemale, SetDataDx] = useState([]);
  const [dataRowsFemale, SetDataRows] = useState([]);
  const [dataItemsFemale, SetDataItems] = useState([]);
  const [allDataFemale, SetAllData] = useState([]);
  const [dataToMapFemale, SetDataToMapFemale] = useState([]);
  const [mapPeriodsFemale, setMapPeriodsFemale] = useState([]);
  const [cancerNamesFemale, setCancerNamesFemale] = useState([]);
  const [dataA, setDataA] = useState([]);
  const [dataB, setDataB] = useState([]);
  const [graphDataA, setGraphDataA] = useState([]);
  const [graphDataB, setGraphDataB] = useState([]);

  const [topCancerTypes, setTopCancerTypes] = useState([]);
  const [cancerWithMax, setCancerWithMax] = useState([]);
  const [isLoading, SetIsLoading] = useState(null);

  const genderWithBottomCancer = GENDERS.filter((gen) => {
    return gen !== cancerWithMax[0];
  })[0];

  const [cancerWithMin,SetcancerWithMin]=useState([])
  const [allCancerCasesSorted,SetAllCancerCasesSorted]=useState([])


  const [cancerTypesFemale, setCancerTypes] = useState([]);
  const [graphCategories, setGraphCategories] = useState([]);

  const [popData1, setPopData1] = useState([]);
  const [popData2, setPopData2] = useState([]);
  const [popData3, setPopData3] = useState([]);
  const [totalPopData, setTotalPopData] = useState([]);
  const [totalDeath, setTotalDeath] = useState([]);
  const [totalCases, setTotalCases] = useState([]);
  const [totalCasesMaleFemale, setTotalCasesMaleFemale] = useState([]);
  const [totalDeathsMaleFemale, setTotalDeathsMaleFemale] = useState([]);

  const totalCasesMale = totalCasesMaleFemale.filter((data) => {
    return data[0] === "Male";
  })[0];

  const totalCasesFemale = totalCasesMaleFemale.filter((data) => {
    return data[0] === "Female";
  })[0];

  const totalDeathsMale = totalDeathsMaleFemale.filter((data) => {
    return data[0] === "Male";
  })[0];

  const totalDeathsFemale = totalDeathsMaleFemale.filter((data) => {
    return data[0] === "Female";
  })[0];

  const populationMale = popData1
    .filter((data) => {
      return data[0] === POPULATION_MALE || data[1] === ouSelected;
    })
    .filter((data2) => {
      return data2[1] === countySelected;
    })
    .filter((data3) => {
      return data3[0] === POPULATION_MALE;
    })[0];

  const populationFemale = popData1
    .filter((data) => {
      return data[0] === POPULATION_FEMALE;
    })
    .filter((data2) => {
      return data2[1] === countySelected;
    })
    .filter((data3) => {
      return data3[0] === POPULATION_FEMALE;
    })[0];

  const maleUrl = ``;

  const dataUrl = `${APP_URL}/analytics/events/aggregate/Gx43mgh4uxr.json?dimension=ou:${ouSelected}&dimension=pe:${period2}&dimension=k8bX0rJnw6o.CJdB3XK2YSa:IN:Male;Female&dimension=k8bX0rJnw6o.rnAfX4JDuPY&stage=k8bX0rJnw6o&displayProperty=NAME&outputType=EVENT&outputIdScheme=NAME`;
  const popDataUrl1 = `
  ${APP_URL}/29/analytics.json?dimension=dx:jECY5h0JtGE.Ir8llfjvJuG;jECY5h0JtGE.yqC2PWGyhed&dimension=ou:${ouSelected};HfVjCurKxh2&filter=pe:LAST_YEAR&displayProperty=NAME&outputIdScheme=UID
  `;

  const totalPopUrl = `${APP_URL}/analytics.json?dimension=dx:jECY5h0JtGE&dimension=pe:2020&filter=ou:${ouSelected}&displayProperty=NAME&outputIdScheme=NAME`;

  const popDatasUrl2 = `
  ${APP_URL}/analytics/events/aggregate/Gx43mgh4uxr.json?dimension=ou:HfVjCurKxh2&dimension=pe:LAST_12_MONTHS&dimension=k8bX0rJnw6o.CJdB3XK2YSa:IN:Male&dimension=k8bX0rJnw6o.rnAfX4JDuPY&stage=k8bX0rJnw6o&displayProperty=NAME&outputType=EVENT&outputIdScheme=NAME
  `;
  const popData3Url = `
  ${APP_URL}/analytics/events/aggregate/Gx43mgh4uxr.json?dimension=ou:HfVjCurKxh2&dimension=pe:LAST_12_MONTHS&dimension=k8bX0rJnw6o.CJdB3XK2YSa:IN:Female&dimension=k8bX0rJnw6o.rnAfX4JDuPY&stage=k8bX0rJnw6o&displayProperty=NAME&outputType=EVENT&outputIdScheme=NAME
  `;

  const totalDeathUrl = `
  ${APP_URL}/analytics/events/aggregate/Gx43mgh4uxr.json?dimension=ou:${ouSelected}&dimension=pe:LAST_MONTH&dimension=k8bX0rJnw6o.BITcpbzhbNm:IN:Dead&stage=k8bX0rJnw6o&displayProperty=NAME&completedOnly=true&outputType=EVENT&outputIdScheme=NAME
  `;

  const totalCasesUrl = `
  ${APP_URL}/analytics/events/aggregate/Gx43mgh4uxr.json?dimension=ou:${ouSelected}&dimension=pe:LAST_MONTH&stage=k8bX0rJnw6o&displayProperty=NAME&completedOnly=true&outputType=EVENT&outputIdScheme=NAME
  `;

  const numberCancerCaseMaleFemaleUrl = `
  ${APP_URL}/analytics/events/aggregate/Gx43mgh4uxr.json?dimension=ou:${ouSelected}&dimension=pe:LAST_MONTH&dimension=k8bX0rJnw6o.CJdB3XK2YSa:IN:Male;Female&stage=k8bX0rJnw6o&displayProperty=NAME&outputType=EVENT&outputIdScheme=UID
  `;
  const numberCancerDeathsMaleFemaleUrl = `
    ${APP_URL}/analytics/events/aggregate/Gx43mgh4uxr.json?dimension=ou:${ouSelected}&dimension=pe:LAST_MONTH&dimension=k8bX0rJnw6o.CJdB3XK2YSa:IN:Female;Male&dimension=k8bX0rJnw6o.BITcpbzhbNm:IN:Dead&stage=k8bX0rJnw6o&displayProperty=NAME&outputType=EVENT&outputIdScheme=UID
    `;
  const getCasesNumber = async (
    url,
    SetAllData,
    SetDataDx,
    SetDataPe,
    SetDataItems,
    SetDataRows
  ) => {
    SetIsLoading(true);

    try {
      let getDataApi = await justFetch(url, {});
      let res = await getDataApi;
      // console.log({ res });
      SetAllData(await res);
      SetDataDx(await res.metaData.dimensions.dx);
      SetDataPe(await res.metaData.dimensions.pe);
      SetDataItems(await res.metaData.items);
      SetDataRows(
        await res.rows.filter((data2) => {
          return data2[1] !== "" && data2[1].length === 5;
        })
      );
      setCancerTypes(await res.metaData.dimensions[CANCER_CODE]);

      const max =
        (await res.rows.length) > 0
          ? await res.rows.reduce(function (prev, current) {
              return parseInt(prev[4]) > parseInt(current[4]) ? prev : current;
            })
          : await res.rows;
      //returns object

      setCancerWithMax(max);
      setTimeout(
        () => {
          SetIsLoading(false);
        },
        (await res.rows.length) === 0 ? 10 : 2000
      );
    } catch (e) {
      setTimeout(() => {
        SetIsLoading(false);
      }, 1000);
    }

    // console.log(max);
  };

  const getTotalNumberOfCases = async (url, SetData) => {
    let getDataApi = await justFetch(url, {});
    let res = await getDataApi;

    // console.log(`data for ${url}`);
    // console.log(await res);

    SetData(await res.rows);
  };

  useEffect(() => {
    //   get female numbers

    getCasesNumber(
      dataUrl,
      SetAllData,
      SetDataDx,
      SetDataPe,
      SetDataItems,
      SetDataRows
    );
  }, [ouSelected, period2]);

  useEffect(() => {
    if (ouLevel === 1) {
      getTotalNumberOfCases(totalPopUrl, setTotalPopData);
      getTotalNumberOfCases(popDataUrl1, setPopData1);
    }

    getTotalNumberOfCases(totalDeathUrl, setTotalDeath);
    getTotalNumberOfCases(totalCasesUrl, setTotalCases);
    getTotalNumberOfCases(
      numberCancerCaseMaleFemaleUrl,
      setTotalCasesMaleFemale
    );

    getTotalNumberOfCases(
      numberCancerDeathsMaleFemaleUrl,
      setTotalDeathsMaleFemale
    );
  }, [ouLevel, ouSelected]);

  useEffect(() => {
    // console.log("getting dara")
    if (dataItemsFemale.length !== 0 && cancerTypesFemale.length !== 0) {
      setCancerNamesFemale(getCancerName(cancerTypesFemale, dataItemsFemale));
    }
  }, [dataItemsFemale, cancerTypesFemale]);

  useEffect(() => {
    setDataA(
      getRowsFromMaxCases(cancerWithMax[0], dataRowsFemale).length > 0
        ? getRowsFromMaxCases(cancerWithMax[0], dataRowsFemale).slice(0, 10)
        : getRowsFromMaxCases(cancerWithMax[0], dataRowsFemale)
    );
  }, [cancerWithMax]);


  useEffect(() => {
    SetcancerWithMin(
      getRowsFromMaxCases(genderWithBottomCancer, dataRowsFemale).length > 0
        ? getRowsFromMaxCases(genderWithBottomCancer, dataRowsFemale).slice(0, 10)
        : getRowsFromMaxCases(genderWithBottomCancer, dataRowsFemale)
    );
  }, [cancerWithMax]);


  useEffect(() => {
    SetAllCancerCasesSorted(
      getRowsFromMaxCasesBothGenders(dataRowsFemale).length > 0
        ? getRowsFromMaxCasesBothGenders(dataRowsFemale).slice(0, 10)
        : getRowsFromMaxCasesBothGenders(dataRowsFemale)
    );
  }, [cancerWithMax]);

  useEffect(() => {
    setDataB(getDataB(genderWithBottomCancer, dataRowsFemale, topCancerTypes));
  }, [topCancerTypes]);

  useEffect(() => {
    setTopCancerTypes(
      getCancerTypesFromDataWithCases(dataA).length > 0
        ? getCancerTypesFromDataWithCases(dataA).slice(0, 10)
        : getCancerTypesFromDataWithCases(dataA)
    );
  }, [dataA]);

  useEffect(() => {
    setGraphCategories(getToptenCancerNames(topCancerTypes, cancerNamesFemale));
  }, [topCancerTypes]);

  useEffect(() => {
    //   console.log(dataA)
    setGraphDataA(createGraphData(dataA, cancerWithMax[0], false));
  }, [dataA]);

  useEffect(() => {
    // console.log(dataB);

    if (dataB.length !== 0) {
      setGraphDataB(createGraphData(dataB, genderWithBottomCancer, true));
    } else {
      setGraphDataB([]);
    }
  }, [dataB]);

  return (
    <NewCasesNumberContext.Provider
      value={{
        dataToMapFemale,
        dataPeFemale,
        dataItemsFemale,
        mapPeriodsFemale,
        allDataFemale,
        datadxFemale,
        cancerTypesFemale,
        cancerNamesFemale,
        cancerWithMax,
        topCancerTypes,
        dataA,
        graphCategories,
        dataB,
        graphDataA,
        graphDataB,
        genderWithBottomCancer,
        isLoading,
        popData1,
        popData2,
        popData3,
        populationMale,
        populationFemale,
        totalPopData,
        totalDeath,
        totalCases,
        totalCasesMaleFemale,
        totalCasesMale,
        totalCasesFemale,
        totalDeathsMaleFemale,
        totalDeathsMale,
        totalDeathsFemale,dataRowsFemale,cancerWithMin,allCancerCasesSorted
      }}
    >
      {props.children}
    </NewCasesNumberContext.Provider>
  );
};
