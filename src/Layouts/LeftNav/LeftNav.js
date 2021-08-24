import React from "react";
import AppCol from "../AppCol/AppCol";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

function LeftNav() {
  return (
    <AppCol size="">
      <div id="left_nav">
        {/* left Appnav */}
        
        <div id="links">
          <ul>
            <li>
              <a href="https://nacare.ncikenya.or.ke" aria-expanded="false">            
              <b>Back to NaCaRe</b>
              </a>
            </li>
            <li>
              <NavLink to="/">Dashboard</NavLink>
            </li>
{/* 
            <li>
              <NavLink to="">About</NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </AppCol>
  );
}

export default LeftNav;
