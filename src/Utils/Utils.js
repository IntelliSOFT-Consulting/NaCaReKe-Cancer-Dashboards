import { KENYA_DHIS2_ID } from "../Constants/Variables";
import { justFetch } from "../Services/JustFetchService";

const getPeriodName = (dataPe, dataItems) => {
  // console.log("getting period")

  let data = [];

  dataPe.map((pe) => {
    let periodName = "";
    periodName = dataItems[parseInt(pe)].name;
    data = [...data, periodName];
  });

  return data;
};

const getPeriodName2 = (dataPe, dataItems) => {
  let data = [];

  dataPe.map((pe) => {
    let periodName = "";
    periodName = dataItems[pe].name;
    //   console.log(periodName)
    data = [...data, periodName];
  });

  return data;
};

const filterFromRowDataWhereCodeEquals = (rowData, Code) => {
  // console.log(rowData)
  return rowData.filter((rd) => {
    // console.log(rd)
    return Code === rd[1];
  });
};

const returnCancerDataFromArray = (array) => {
  let data = [];

  return array
    .map((data) => {
      return (data = [...data, data[4]]);
    })
    .map((data2) => {
      return parseInt(data2[4]);
    });
};

const returnCancerDataFromArrayNegative = (array) => {
  let data = [];

  return array
    .map((data) => {
      return (data = [...data, data[4]]);
    })
    .map((data2) => {
      return -parseInt(data2[4]);
    });
};

const createGraphData = (array, genderName, isNegative) => {
  // console.log(array)

  let data = [];

  let datafinal = {
    name: genderName,
    data: isNegative
      ? returnCancerDataFromArrayNegative(array).reverse()
      : returnCancerDataFromArray(array).reverse(),
  };
  data = [...data, datafinal];
  array.map((data) => {
    genderName = data[0];
    // console.log(genderName)

    // data=[...data,datafinal]
  });
  // console.log(data[0]);
  return data[0];
};

const getDataB = (gender, rowData, topCancerTypes) => {
  // console.log(gender);
  // console.log(rowData)

  rowData = rowData.filter((rd) => {
    return gender === rd[0];
  });
  // console.log(rowData)

  let data = [];
  topCancerTypes.map((tc) => {
    let dataToMap = filterFromRowDataWhereCodeEquals(rowData, tc);
    // console.log(dataToMap);

    data = [
      ...data,
      dataToMap.length !== 0
        ? dataToMap[0]
        : [gender, tc, KENYA_DHIS2_ID, "PERIOD", "0"],
    ];
  });

  return data;
};

const getCancerNameFromCode = (cancerDataWithKeys, code) => {
  return cancerDataWithKeys
    .filter((data) => {
      return code === data["code"];
    })
    .map((data2) => {
      return data2["name"];
    })[0];
};

const getToptenCancerNames = (dataCancers, cancerNamesFemale) => {
  // console.log("getting period")

  let data = [];

  dataCancers.map((d) => {
    let cancerName = getCancerNameFromCode(cancerNamesFemale, d);

    // console.log(periodName)
    data = [...data, cancerName];
  });

  return data.reverse();
};

const getCancerName = (dataCancers, dataItems) => {
  // console.log("getting period")

  let data = [];

  dataCancers.map((pe) => {
    let periodName = "";
    periodName = dataItems[pe].name;
    let code = dataItems[pe].code;

    // console.log(periodName)
    data = [
      ...data,
      {
        name: periodName,
        code: code,
      },
    ];
  });

  return data;
};

const getRowsFromMaxCases = (gender, dataRows) => {
  return dataRows
    .filter((data) => {
      return data[0] === gender;
    })
    .sort((a, b) => (parseInt(a[4]) < parseInt(b[4]) && 1) || -1);
};


const sortFromHighestToLowest=(array)=>{
  return   array.sort((a, b) => (parseInt(a[4]) < parseInt(b[4]) && 1) || -1)
}

const getRowsFromMaxCasesBothGenders = (dataRows) => {
  return dataRows.sort((a, b) => (parseInt(a[4]) < parseInt(b[4]) && 1) || -1);
};

const getCancerTypesFromRawRows = (array) => {
  let data = [];
  // console.log(array)
  array.map((arr) => {
    data.push(arr[1]);
  });

  return [...new Set(data)];
};

const addAliveDead = (array) => {
  let values = [];
  array.map((arr) => {
    values = [...values, parseInt(arr[4])];
  });

  return values.reduce((a, b) => a + b, 0);
};

const getDataWithRelatedCancerid = (array, code) => {
  return array.filter((arr) => {
    return arr[1] === code;
  });
};

const generateDataForAllAliveDead = (array, cancerTypes) => {
  let data = [];
  cancerTypes.map((ct) => {
    let related = getDataWithRelatedCancerid(array, ct);
    let added = addAliveDead(related);
    data = [
      ...data,
      ["Incidences", `${ct}`, "HfVjCurKxh2", "PERIOD", `${added}`],
    ];
  });
  return data;
};
const getCancerTypesFromDataWithCases = (dataRows) => {
  // console.log(dataRows);

  let data = [];

  return dataRows.map((data) => {
    // console.log(data[1])
    return data[1];
    // data = [...data,data[1]];
  });

  // return data;
};

const getData = (url) => {
  return justFetch(url, {}).then((res) => {
    return res;
  });
};

const generateDataToMap = (datadx, dataRows, dataItems) => {
  let mapData = [];

  datadx.map((mydx) => {
    let indicatorName = "";
    let data = [];
    let finalData = {
      name: indicatorName,
      data: data,
    };
    // console.log(dataItems[mydx].name);
    indicatorName = dataItems[mydx].name;

    let filteredData = dataRows
      .filter((dr) => {
        return dr[0] === mydx;
      })
      .map((dr2) => {
        return parseInt(dr2[3]);
      });

    data = filteredData.sort((a, b) => {
      return a[1] - b[1];
    });
    // console.log(filteredData)
    data = [{ name: indicatorName, data: filteredData }];
    // console.log(data);
    mapData = [...mapData, data[0]];
  });

  return mapData;
};

function IncludeNumberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// var x = 2.4014716E7
// var y = toFixed(x)
// console.log(y)
function convertExponentialToNumber(x) {
  // x=2.4014716E7
  x = Number(x);
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return IncludeNumberWithCommas(x);
}

const findIndexOfValueInArray = (array, value) => {
  const found= array.findIndex((element, index) => element[1] === value);
  // console.log(found)

  if(found+1 === 0){
    return "-"
  }

  else{
    return found+1
  }
  
};


const findDeathNumberFromValue = (array, value) => {
  const found= array.find((element, index) => element[1] === value);

  if(found === undefined){
    return "-"

  }else{
    
  console.log(typeof(found))
return found[4]
  }
  

 
  
};
export {
  getPeriodName,
  getData,
  generateDataToMap,
  getPeriodName2,
  getCancerName,
  getCancerTypesFromDataWithCases,
  getRowsFromMaxCases,
  getToptenCancerNames,
  getDataB,
  createGraphData,
  getCancerTypesFromRawRows,
  generateDataForAllAliveDead,
  convertExponentialToNumber,
  IncludeNumberWithCommas,
  getCancerNameFromCode,
  getRowsFromMaxCasesBothGenders,
  findIndexOfValueInArray,
  findDeathNumberFromValue,sortFromHighestToLowest
};
