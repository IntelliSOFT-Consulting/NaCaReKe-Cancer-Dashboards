import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


// console.log(ncikLogo)

function AppNav(props) {
  const appName="NaCaRe Dashboard"
  return (
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="myNav">
      <div class="container-fluid">
          
        <a class="navbar-brand" href="#">
            <img src='images/NCI-KLogo.png' height="75" class="d-inline-block align-top" alt=""></img>
          {/* {appName} */}
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div style={{padding:0}}  class="collapse navbar-collapse container" id="navbarNav">
          <h1 style={{marginLeft:25}}>
            NaCaRe Dashboard
          </h1>

          {/* <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">
                Mother Child Health Dashboard
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/DiseaseSurveilance">
                Disease Surveillance Dashboard
              </Link>
            </li>
          </ul> */}
        </div>
      </div>
    </nav>
  );
}

export default AppNav;
