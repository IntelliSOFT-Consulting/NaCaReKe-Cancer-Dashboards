import { createContext, useState, useEffect, useContext } from "react";
import { APP_URL, CANCER_CODE,DEAD_ALIVE} from "../../Constants/Variables";
import { justFetch } from "../../Services/JustFetchService";

import {
  createGraphData,
  generateDataForAllAliveDead,
  getCancerName,
  getCancerTypesFromDataWithCases,
  getCancerTypesFromRawRows,
  getDataB,
  getRowsFromMaxCases,
  getToptenCancerNames,
} from "../../Utils/Utils";
import { OrgUnitsContext } from "../OrgUnitsContext/OrgUnitsContext";
export const MortalityAliveCasesContext = createContext();

export const MortalityAliveCasesContextProvider = (props) => {
  const { ouSelected,period2 } = useContext(OrgUnitsContext);

  const [dataPeFemale, SetDataPe] = useState([]);
  const [datadxFemale, SetDataDx] = useState([]);
  const [dataRowsFemale, SetDataRows] = useState([]);
  const [dataRowsRawFemale, SetDataRowsRaw] = useState([]);

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
  const [RawCancerTypes, setRawCancerTypes] = useState([]);
  const [AllIncidences, setAllIncidences] = useState([]);


  const [isLoading, SetIsLoading] = useState(null);

  const genderWithBottomCancer = DEAD_ALIVE.filter((gen) => {
    return gen !== cancerWithMax[0];
  })[0];

  const [cancerTypesFemale, setCancerTypes] = useState([]);
  const [graphCategories, setGraphCategories] = useState([]);

  const maleUrl = ``;

  const dataUrl = `${APP_URL}/analytics/events/aggregate/Gx43mgh4uxr.json?dimension=pe:${period2}&dimension=ou:${ouSelected}&dimension=k8bX0rJnw6o.BITcpbzhbNm:IN:Dead;Alive&dimension=k8bX0rJnw6o.rnAfX4JDuPY&stage=k8bX0rJnw6o&displayProperty=NAME&outputType=EVENT&outputIdScheme=UID`
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
    //   SetDataRows(
    //     await res.rows.filter((data2) => {
    //       return data2[1] !== "" && data2[1].length === 5;
    //     })
    //   );

      SetDataRowsRaw(
        await res.rows.filter((data2) => {
          return data2[1] !== "" && data2[1].length === 5;
        })
      );
      setCancerTypes(await res.metaData.dimensions[CANCER_CODE]);

      
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
  }, [ouSelected,period2]);



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
      // console.log(dataA)
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

  useEffect(() => {
    //   effect
    setRawCancerTypes(getCancerTypesFromRawRows(dataRowsRawFemale))
      return () => {
        //   cleanup
      }
  }, [dataRowsRawFemale])


  useEffect(() => {
    //   effect
    setAllIncidences(generateDataForAllAliveDead(dataRowsRawFemale,RawCancerTypes))
      return () => {
        //   cleanup
      }
  }, [RawCancerTypes])


  useEffect(() => {
    const max =
    (AllIncidences.length) > 0
      ? AllIncidences.reduce(function (prev, current) {
          return parseInt(prev[4]) > parseInt(current[4]) ? prev : current;
        })
      : AllIncidences;
  //returns object

  setCancerWithMax(max);
    //   effect
    SetDataRows(
        AllIncidences.concat(dataRowsRawFemale.filter((d)=>{
            return d[0] === "Dead"
        }))

    )
      return () => {
        //   cleanup
      }
  }, [AllIncidences])


  return (
    <MortalityAliveCasesContext.Provider
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
        isLoading,dataRowsFemale,dataRowsRawFemale,RawCancerTypes,AllIncidences
      }}
    >
      {props.children}
    </MortalityAliveCasesContext.Provider>
  );
};
