import React from "react";
import { MortalityAliveCasesContextProvider } from "../Contexts/MortalityAliveCases/MortalityAliveCases";
import { NewCasesNumberContextProvider } from "../Contexts/NewCassNumberContext/NewCassNumberContext";
import { OrgUnitsContextProvider } from "../Contexts/OrgUnitsContext/OrgUnitsContext";

function ContextProviders(props) {
  const { children } = props;

  return (
    <>
      <OrgUnitsContextProvider>
        <NewCasesNumberContextProvider>
        <MortalityAliveCasesContextProvider>
        {children}
        </MortalityAliveCasesContextProvider>
        </NewCasesNumberContextProvider>
      </OrgUnitsContextProvider>
    </>
  );
}

export default ContextProviders;
