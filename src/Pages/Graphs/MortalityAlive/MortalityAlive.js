import React, { useContext } from "react";
import BarNegative from "../../../Components/Graphs/BarNegative/BarNegative";
import NoData from "../../../Components/NoData/NoData";
import { MortalityAliveCasesContext } from "../../../Contexts/MortalityAliveCases/MortalityAliveCases";
import AppShadowDiv from "../../../Layouts/AppShadowDiv/AppShadowDiv";


function MortalityAlive() {
    const { graphDataB, graphDataA, graphCategories, dataA, dataB } = useContext(
        MortalityAliveCasesContext
      );
    return (
        <AppShadowDiv>
        {dataA.length !== 0 || dataB.length !== 0 ? (
          <>
            <BarNegative
            containerDiv="container2" 
              title="Number of deaths(mortality - Incidences)"
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
    )
}

export default MortalityAlive
