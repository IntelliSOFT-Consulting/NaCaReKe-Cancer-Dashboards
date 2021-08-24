import React, { useContext } from "react";
import BackdropLoading from "../../Components/BackdropLoading/BackdropLoading";
import SubdivisionFilter from "../../Components/SubdivisionFilter/SubdivisionFilter";
import { NewCasesNumberContext } from "../../Contexts/NewCassNumberContext/NewCassNumberContext";
import Routes from "../../Routes/Routes";
import AppCol from "../AppCol/AppCol";
import AppContainer from "../AppContainer/AppContainer";
import AppNav from "../AppNav/AppNav";
import AppRow from "../AppRow/AppRow";
import LeftNav from "../LeftNav/LeftNav";

function AppMainLayout() {
  const { isLoading } = useContext(NewCasesNumberContext);

  return (
    <div>
      <AppNav></AppNav>

      <AppContainer>
        <AppRow>
          {isLoading && <BackdropLoading></BackdropLoading>}
          <LeftNav />
          <AppCol size="">
            <div id="right_div">
              <SubdivisionFilter />
              <div style={{ marginTop: 20 }}>
                <Routes></Routes>
              </div>
            </div>
          </AppCol>
        </AppRow>
      </AppContainer>
    </div>
  );
}

export default AppMainLayout;
