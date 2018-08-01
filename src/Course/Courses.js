import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CourseHeader from "./CourseHeader";

export default class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://lmsdemomar.azurewebsites.net/api/course`)
      .then(response => {
        const courses = response.data;
        this.setState({ courses });
      })
      .catch(e => {
        alert(e);
      });
  }

  render() {
    const { courses } = this.state;
    return (
      <div className="main">
        <CourseHeader />

        <div className="row mb-2 coursecard">
          {courses.map(course => (
            <div key={course.Id} className="col-md-6">
              <div className="card flex-md-row mb-4 box-shadow h-md-250">
                <div className="card-body d-flex flex-column align-items-start">
                  <h3 className="mb-0">
                    <Link className="text-dark" to={`/courses/${course.Id}`}>
                      {course.Name}
                    </Link>
                  </h3>
                  <div className="mb-1 text-muted">
                    COURSE ID -- {course.Id}
                  </div>
                </div>
                <img
                  className="card-img-right flex-auto d-none d-md-block coursecard-img"
                  src="https://i.pinimg.com/originals/a2/21/8c/a2218ca943271618502c1c7b58f45ff7.jpg"
                  alt="Card"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Code</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.Id}>
                  <td>{course.Id}</td>

                  <td>
                    <Link to={`/courses/${course.Id}`}>{course.Name}</Link>
                  </td>

                  <td>{course.CourseCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
