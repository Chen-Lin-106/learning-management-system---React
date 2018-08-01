import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import StudentHeader from "./StudentHeader";

export default class StudentEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: {},
      error: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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
    const { history } = this.props;
    if ("NEW" === id) {
      if (this.validateForm()) {
        axios
          .post(`http://lmsdemomar.azurewebsites.net/api/student`, students)
          .then(() => {
            history.push("/students");
          });
        swal("Great!", "New Student has been added sucessfully", "success");
      }
    } else {
      axios
        .put(`http://lmsdemomar.azurewebsites.net/api/student/${id}`, students)
        .then(() => {
          history.push("/students");
        });
      swal("Great!", "It has been edited sucessfully!", "success");
    }
  }

  validateForm() {
    const { students } = this.state;
    const { error } = this.state;

    if (!students['Name']) {
      error['Name'] = "* Please Enter Name";
    }

    this.setState({
        error: error
      });
  }

  render() {
    const { students } = this.state;
    const { error } = this.state;
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

          </li>
        </ul>

        <div className="container">
          <form key={students.Id} className="needs-validation">
            <div className="row">
              <div className="col-md-3 mb-3">
                <label for="validationDefault01">Name</label>
                <input
                  className="form-control"
                  id="validationDefault01"
                  value={students.Name}
                  name="Name"
                  onChange={this.handleInputChange}
                  required
                />
              <div className="error">{error.Name}</div>
              </div>

              <div className="btn-group col-md-12 mb-12">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={this.handleSubmit}
                >
                  Save
                </button>

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
