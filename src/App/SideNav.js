import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SideNav extends Component {
  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/courses">
                Course
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/students">
                Student
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/lecturers">
                Lecturer
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
