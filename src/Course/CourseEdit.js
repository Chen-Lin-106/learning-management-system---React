import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import CourseHeader from "./CourseHeader";

export default class CourseEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { courses } = this.state;
    if ("NEW" === id) {
      this.setState({ courses });
    } else {
      axios
        .get(`http://lmsdemomar.azurewebsites.net/api/course/${id}`)
        .then(response => {
          const courses = response.data;
          this.setState({ courses });
        });
    }
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    const courses = { ...this.state.courses };
    courses[name] = value;
    this.setState({ courses });
    console.log(courses);
  };

  handleSubmit(e) {
    e.preventDefault();
    const { courses } = this.state;
    const { id } = this.props.match.params;
    const {
      history
    } = this.props;
    if ("NEW" === id) {
      axios
        .post(`http://lmsdemomar.azurewebsites.net/api/course`, courses)
        .then(() => {
          history.push("/courses");
        });
      swal("Great!", "New Course has been added sucessfully", "success");
    } else {
      axios
        .put(`http://lmsdemomar.azurewebsites.net/api/course/${id}`, courses)
        .then(() => {
          history.push("/courses");
        });
      swal("Great!", "It has been edited sucessfully!", "success");
    }
  }

  render() {
    const { courses } = this.state;
    return (
      <div className="main">
        <CourseHeader />

        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" href="">
              Course
            </a>
          </li>
          <li className="nav-item">

          </li>
        </ul>

        <div className="container">
          <form className="needs-validation" key={courses.Id}>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label>Name</label>
                <input
                  className="form-control"
                  value={courses.Name}
                  name="Name"
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label>Code</label>
                <input
                  className="form-control"
                  value={courses.CourseCode}
                  name="CourseCode"
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label>Introduction</label>
                <input
                  className="form-control"
                  value={courses.Introduction}
                  name="Introduction"
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={this.handleSubmit}
                >
                  Save
                </button>

                <Link to="/courses">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
