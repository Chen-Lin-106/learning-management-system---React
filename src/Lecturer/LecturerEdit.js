import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import LecturerHeader from "./LecturerHeader";

export default class CourseEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lecturers: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { lecturers } = this.state;
    if ("NEW" === id) {
      this.setState({ lecturers });
    } else {
      axios
        .get(`http://lmsdemomar.azurewebsites.net/api/lecturer/${id}`)
        .then(response => {
          const lecturers = response.data;
          this.setState({ lecturers });
        });
    }
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    const lecturers = { ...this.state.lecturers };
    lecturers[name] = value;
    this.setState({ lecturers });
    console.log(lecturers);
  };

  handleSubmit(e) {
    e.preventDefault();
    const { lecturers } = this.state;
    const { id } = this.props.match.params;
    const { history } = this.props;
    if ("NEW" === id) {
      axios
        .post(`http://lmsdemomar.azurewebsites.net/api/lecturer`, lecturers)
        .then(() => {
        history.push('/lecturers');
        });
      swal("Great!", "New Course has been added sucessfully", "success");
      this.setState({ showbutton: false });
    } else {
      axios
        .put(
          `http://lmsdemomar.azurewebsites.net/api/lecturer/${id}`,
          lecturers
        )
        .then(() => {
        history.push('/lecturers');
        });
      swal("Great!", "It has been edited sucessfully!", "success");
      this.setState({ showbutton: false });
    }
  }

  render() {
    const { lecturers } = this.state;
    return (
      <div className="main">
        <LecturerHeader />

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
          <form className="needs-validation" key={lecturers.Id}>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label>Name</label>
                <input
                  className="form-control"
                  value={lecturers.Name}
                  name="Name"
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


                <Link to="/lecturers">
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
