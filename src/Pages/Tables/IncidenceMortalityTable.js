import React, { useContext } from "react";
import { MortalityAliveCasesContext } from "../../Contexts/MortalityAliveCases/MortalityAliveCases";
import { NewCasesNumberContext } from "../../Contexts/NewCassNumberContext/NewCassNumberContext";
import {
  convertExponentialToNumber,
  findDeathNumberFromValue,
  findIndexOfValueInArray,
  getCancerNameFromCode,
  sortFromHighestToLowest,
} from "../../Utils/Utils";

function IncidenceMortalityTable(props) {
  const {
    graphDataB,
    graphDataA,
    graphCategories,
    dataA,

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

  const { dataB } = useContext(MortalityAliveCasesContext);
  // console.log(dataB);
  return (
    <div>
      <table class="table table-hover caption-top">
        <caption>Incidence,Mortality by cancer site</caption>
        <thead>
          <tr>
            <th>#</th>
            <th colSpan="2"><center>New Cases</center></th>
            <th colSpan="2"><center>Deaths</center></th>
          </tr>
          <tr>
            <th scope="col">Cancer</th>
            <th scope="col">Number</th>
            <th scope="col">Rank</th>
            <th scope="col">Number</th>
            <th scope="col">Rank</th>
          </tr>
        </thead>

        <tbody>
          {allCancerCasesSorted.map((data, index) => {
            return (
              <>
                <tr key={index}>
                  <td>{getCancerNameFromCode(cancerNamesFemale, data[1])}</td>
                  <td>{data[4]}</td>
                  <td>{index + 1}</td>
                  <td>
                    {findDeathNumberFromValue(
                      sortFromHighestToLowest(dataB),
                      data[1]
                    )}
                  </td>

                  <td>
                    {findIndexOfValueInArray(
                      sortFromHighestToLowest(dataB),
                      data[1]
                    )}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default IncidenceMortalityTable;
