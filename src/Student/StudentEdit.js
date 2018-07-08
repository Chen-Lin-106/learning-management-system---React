import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import StudentHeader from "./StudentHeader";

export default class StudentEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showbutton: true,
      students: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    const { students } = this.state;
    if ("NEW" === id) {
      this.setState({ students });
    } else {
      axios
        .get(`http://lmsdemomar.azurewebsites.net/api/student/${id}`)
        .then(response => {
          const students = response.data;
          this.setState({ students });
        });
    }
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    const students = { ...this.state.students };
    students[name] = value;
    this.setState({ students });
    console.log(students);
  };

  handleSubmit(e) {
    e.preventDefault();
    const { students } = this.state;
    const { id } = this.props.match.params;
    if ("NEW" === id) {
      axios
        .post(`http://lmsdemomar.azurewebsites.net/api/student`, students)
        .then(response => {
          console.log(response);
        });
      swal("Great!", "New Course has been added sucessfully", "success");
      this.setState({ showbutton: false });
    } else {
      axios
        .put(
          `http://lmsdemomar.azurewebsites.net/api/student/${id}`,
          students
        )
        .then(response => {
          console.log(response);
        });
      swal("Great!", "It has been edited sucessfully!", "success");
      this.setState({ showbutton: false });
    }
  }

  render() {
    const { students } = this.state;
    return (
      <div className="main">
        <StudentHeader />

        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" href="">
              Lecturer
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="">
            </a>
          </li>
        </ul>

        <div className="container">
          <form key={students.Id} className="needs-validation" novalidate>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label for="firstName">Name</label>
                <input
                  className="form-control"
                  value={students.Name}
                  name="Name"
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="btn-group">
                {this.state.showbutton ? (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={this.handleSubmit}
                  >
                    Save
                  </button>
                ) : null}

                <Link to="/students">
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
