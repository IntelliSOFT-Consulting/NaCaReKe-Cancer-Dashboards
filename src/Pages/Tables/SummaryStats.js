import React, { useContext } from "react";
import { NewCasesNumberContext } from "../../Contexts/NewCassNumberContext/NewCassNumberContext";
import {
  convertExponentialToNumber,
  getCancerNameFromCode,
} from "../../Utils/Utils";

function SummaryStats(props) {
  const {
    graphDataB,
    graphDataA,
    graphCategories,
    dataA,
    dataB,
    popData1,
    populationMale,
    populationFemale,
    casesBothGenderAllAges,
    totalPopData,
    totalDeath,
    totalCases,
    totalCasesMale,
    totalCasesFemale,
    totalDeathsMale,
    totalDeathsFemale,
    cancerNamesFemale,
    cancerWithMin,
    allCancerCasesSorted,
  } = useContext(NewCasesNumberContext);
  return (
    <div>
      <table class="table table-hover caption-top">
      <caption>Summary statistic</caption>
        <thead>
          <tr>
            <th scope="col">#</th>

            <th scope="col">Male</th>
            <th scope="col">Female</th>
            <th scope="col">Both Sexes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Population</td>
            <td>
              {populationFemale !== undefined && populationFemale.length !== 0
                ? convertExponentialToNumber(populationFemale[2])
                : "..."}
            </td>
            <td>
              {populationMale !== undefined && populationMale.length !== 0
                ? convertExponentialToNumber(populationMale[2])
                : "..."}
            </td>
            <td>
              {totalPopData !== undefined && totalPopData.length !== 0
                ? convertExponentialToNumber(totalPopData[0][2])
                : "..."}
            </td>
          </tr>
          <tr>
            <td>Number of new cancer cases</td>
            <td>
              {totalCasesMale !== undefined && totalCasesMale.length !== 0
                ? convertExponentialToNumber(totalCasesMale[3])
                : "..."}
            </td>
            <td>
              {totalCasesFemale !== undefined && totalCasesFemale.length !== 0
                ? convertExponentialToNumber(totalCasesFemale[3])
                : "..."}
            </td>
            <td>
              {totalCases !== undefined && totalCases.length !== 0
                ? convertExponentialToNumber(totalCases[0][2])
                : "..."}
            </td>
          </tr>
          <tr>
            <td>Age-standardized incidence rate (KENYA) </td>
            <td>133.2</td>
            <td>168.2</td>
            <td>149.2</td>

          </tr>
          <tr>
            <td>Risk of developing cancer before the age of 75 years (%) </td>
            <td>14.3</td>
            <td>18.0</td>
            <td>16.2</td>

          </tr>

          <tr>
            <td>Number of cancer deaths</td>
            <td>
              {" "}
              {totalDeathsMale !== undefined && totalDeathsMale.length !== 0
                ? convertExponentialToNumber(totalDeathsMale[4])
                : "..."}
            </td>
            <td>
              {totalDeathsFemale !== undefined && totalDeathsFemale.length !== 0
                ? convertExponentialToNumber(totalDeathsFemale[4])
                : "..."}
            </td>
            <td>
              {totalDeath !== undefined && totalDeath.length !== 0
                ? convertExponentialToNumber(totalDeath[0][3])
                : "..."}
            </td>
          </tr>
          <tr>
            <td>Age-standardized mortality rate (KENYA) </td>
            <td>96.5</td>
            <td>112.6</td>
            <td>103.2</td>

          </tr>

          <tr>
            <td>Risk of dying from cancer before the age of 75 years (%) </td>
            <td>10.3</td>
            <td>12.7</td>
            <td>11.6</td>

          </tr>
          <tr>
            <td>5-year prevalent cases </td>
            <td>28 464</td>
            <td>54 156</td>
            <td>82 620</td>

          </tr>


          <tr>
            <td>Top 5 most frequent cancers</td>
            <td>
              {cancerWithMin.slice(0, 5).map((data, index) => {
                return (
                  <>
                    <span key={index}>
                      {getCancerNameFromCode(cancerNamesFemale, data[1])}
                    </span>
                    <br></br>
                    <hr></hr>
                  </>
                );
              })}
            </td>
            <td>
              {dataA.slice(0, 5).map((data, index) => {
                return (
                  <>
                    <span key={index}>
                      {getCancerNameFromCode(cancerNamesFemale, data[1])}
                    </span>
                    <br></br>
                    <hr></hr>
                  </>
                );
              })}
            </td>
            <td>
              {allCancerCasesSorted.slice(0, 5).map((data, index) => {
                return (
                  <>
                    <span key={index}>
                      {getCancerNameFromCode(cancerNamesFemale, data[1])}
                    </span>
                    <br></br>
                    <hr></hr>
                  </>
                );
              })}
            </td>
          </tr>

          
        </tbody>
      </table>
    </div>
  );
}

export default SummaryStats;
