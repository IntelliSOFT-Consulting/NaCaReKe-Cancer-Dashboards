import React, { useContext } from "react";
import CardForNumberData from "../../Components/CardForNumberData/CardForNumberData";
import BarNegative from "../../Components/Graphs/BarNegative/BarNegative";
import NoData from "../../Components/NoData/NoData";
import { NewCasesNumberContext } from "../../Contexts/NewCassNumberContext/NewCassNumberContext";
import AppCol from "../../Layouts/AppCol/AppCol";
import AppContainer from "../../Layouts/AppContainer/AppContainer";
import AppPadding from "../../Layouts/AppPadding/AppPadding";
import AppRow from "../../Layouts/AppRow/AppRow";
import AppShadowDiv from "../../Layouts/AppShadowDiv/AppShadowDiv";
import {
  convertExponentialToNumber,
  IncludeNumberWithCommas,
} from "../../Utils/Utils";
import MortalityAlive from "../Graphs/MortalityAlive/MortalityAlive";
import IncidenceMortalityTable from "../Tables/IncidenceMortalityTable";
import SummaryStats from "../Tables/SummaryStats";

function HomePage() {
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
    totalDeath,totalCases
  } = useContext(NewCasesNumberContext);
  return (
    <div>
      <hr></hr>

      <AppContainer style={{ padding: 10 }}>
        <AppRow>
          <AppCol size="2">
            <AppPadding>
              <CardForNumberData
                number={
                  totalCases !== undefined && totalCases.length !== 0
                    ? convertExponentialToNumber(totalCases[0][2])
                    : "..."
                }
                title="Total Cases"
              ></CardForNumberData>
            </AppPadding>
          </AppCol>
          <AppCol size="2">
            <AppPadding>
              <CardForNumberData
                number={
                  totalDeath !== undefined && totalDeath.length !== 0
                    ? convertExponentialToNumber(totalDeath[0][3])
                    : "..."
                }
                title="Total Deaths"
              ></CardForNumberData>
            </AppPadding>
          </AppCol>

          <AppCol size="2">
            <AppPadding>
              <CardForNumberData
                appShadowStyle={{ backgroundColor: "#9e9edf", color: "red" }}
                number={
                  populationMale !== undefined && populationMale.length !== 0
                    ? convertExponentialToNumber(populationMale[2])
                    : "..."
                }
                title="Total Male Population"
              ></CardForNumberData>
            </AppPadding>
          </AppCol>
          <AppCol size="2">
            <AppPadding>
              <CardForNumberData
                number={
                  populationFemale !== undefined &&
                  populationFemale.length !== 0
                    ? convertExponentialToNumber(populationFemale[2])
                    : "..."
                }
                title="Total Female Population"
              ></CardForNumberData>
            </AppPadding>
          </AppCol>

          <AppCol size="3">
            <AppPadding>
              <CardForNumberData
                number={
                  totalPopData !== undefined && totalPopData.length !== 0
                    ? convertExponentialToNumber(totalPopData[0][2])
                    : "..."
                }
                title="Total Population"
              ></CardForNumberData>
            </AppPadding>
          </AppCol>
        </AppRow>
      </AppContainer>

      <AppShadowDiv>
        {dataA.length !== 0 || dataB.length !== 0 ? (
          <>
            <BarNegative
              containerDiv="container1"
              title="Number of new cases (incidences)"
              data1={graphDataA}
              data2={graphDataB}
              gcategories={graphCategories}
            ></BarNegative>
          </>
        ) : (
          <>
            <NoData />
          </>
        )}
      </AppShadowDiv>

      <MortalityAlive></MortalityAlive>

      <AppShadowDiv>
        <SummaryStats></SummaryStats>
      </AppShadowDiv>

      <AppShadowDiv>
        <IncidenceMortalityTable></IncidenceMortalityTable>
      </AppShadowDiv>
    </div>
  );
}

export default HomePage;
