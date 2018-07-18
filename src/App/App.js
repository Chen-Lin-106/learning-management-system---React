import React, { Component } from "react";
import TopNav from "./TopNav";
import Routes from "./Routes";
import SideNav from "./SideNav";
import "../css/style.css";

export default class App extends Component {  
  render() {
    return (
      <div>
        <TopNav />
        <div className="container-fluid">
          <div className="row">
            <SideNav />
            <Routes />
          </div>
        </div>
      </div>
    );
  }
}
