import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Courses from "../Course/Courses";
import CourseDetail from "../Course/CourseDetail";
import CourseEdit from "../Course/CourseEdit";
import CourseNew from "../Course/CourseNew";
import Lecturers from "../Lecturer/Lecturers";
import LecturerDetail from "../Lecturer/LecturerDetail";
import LecturerEdit from "../Lecturer/LecturerEdit";
import LecturerNew from "../Lecturer/LecturerNew";
import Students from "../Student/Students";
import StudentDetail from "../Student/StudentDetail";
import StudentEdit from "../Student/StudentEdit";
import StudentNew from "../Student/StudentNew";


export default () => (
  <div className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-2">
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/courses" component={Courses} />
    <Route exact path="/courses/:id" component={CourseDetail} />
    <Route exact path="/courses/edit/:id" component={CourseEdit} />
    <Route exact path="/courses/edit/NEW" component={CourseNew} />
    <Route exact path="/lecturers" component={Lecturers} />
    <Route exact path="/lecturers/:id" component={LecturerDetail} />
    <Route exact path="/lecturers/edit/:id" component={LecturerEdit} />
    <Route exact path="/lecturers/edit/NEW" component={LecturerNew} />
    <Route exact path="/students" component={Students} />
    <Route exact path="/students/:id" component={StudentDetail} />
    <Route exact path="/students/edit/:id" component={StudentEdit} />
    <Route exact path="/students/edit/NEW" component={StudentNew} />
  </div>
);
