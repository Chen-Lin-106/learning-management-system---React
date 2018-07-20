import React, { Component } from "react";
import { NavLink } from 'react-router-dom'

export default class SideNav extends Component {
  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/courses">
                Course
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/students">
                Student
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/lecturers">
                Lecturer
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
