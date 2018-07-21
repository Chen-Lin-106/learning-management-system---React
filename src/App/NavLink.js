import React, { Component } from "react";
import { Link } from 'react-router-dom'

export default class NavLink extends Component {
  render() {
    return(
      <div>
      <a href="" className="dropdown dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Nav to <span className="caret"></span></a>
      <ul className="dropdown-menu">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/courses">Course</Link></li>
        <li><Link to="/students">Student</Link></li>
        <li><Link to="/lecturers">Lecturer</Link></li>
      </ul>
      </div>
    )
  }
}
