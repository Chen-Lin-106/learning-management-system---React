import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import LecturerHeader from "./LecturerHeader";

export default class LecturerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showbutton: true,
      lecturers: {},
      teaching: {}
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.deletePick = this.deletePick.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    axios
      .get(`http://lmsdemomar.azurewebsites.net/api/lecturer/${id}`)
      .then(response => {
        const lecturers = response.data;
        this.setState({ lecturers });
      });
  }

  handleDelete = event => {
    const { id } = this.props.match.params;
    axios
      .delete(`http://lmsdemomar.azurewebsites.net/api/lecturer/${id}`)
      .then(response => {
        console.log(response);
      });
    swal("Deleted", "Item has been deleted", "success");
    this.setState({ showbutton: false });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    const teaching = { ...this.state.teaching };
    teaching[name] = value;
    this.setState({ teaching });
    console.log(teaching);
  };

  deletePick(e) {
    e.preventDefault();
    const { id } = this.props.match.params;
    axios
      .delete(`http://lmsdemomar.azurewebsites.net/api/teaching/${id}`)
      .then(response => {
        console.log(response);
      });
    swal("Delete", "Course has been droped", "success");
  }

    handlePick(e) {
      e.preventDefault();
      const { teaching } = this.state;
      axios
        .post(`http://lmsdemomar.azurewebsites.net/api/teaching`, teaching)
        .then(response => {
          console.log(response);
        });
        swal("Great!", "Course has been choose sucessfully", "success");
      }

  render() {
    const { lecturers } = this.state;
    const { teaching } = this.state;
    return (
      <div className="main">
        <LecturerHeader />

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4 box-shadow">
                <img
                  className="card-img-top"
                  src="http://www.hexatar.com/gallery/png/151204_094136_m35fd66e783.png"
                  alt="Card"
                />
                <div key={lecturers.Id} className="card-body">
                  <h5 className="card-title">{lecturers.Name}</h5>
                  <h6 className="card-title">
                    ID ---> #{lecturers.Id}
                  </h6>


                  <div className="d-flex justify-content-center align-items-center">
                    <div className="btn-group">
                      <Link to={`/lecturers/edit/${lecturers.Id}`}>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </Link>
                      <Link to={`/lecturers/${lecturers.Id}`}>
                        {this.state.showbutton ? (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={this.handleDelete}
                          >
                            Delete
                          </button>
                        ) : null}
                      </Link>
                      <Link to="/lecturers">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Close
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                value={teaching.lecturerId}
                name="lecturerId"
                placeholder="Course ID"
                onChange={this.handleInputChange}
              />
              <input
                  className="form-control"
                  value={teaching.courseId}
                  name="courseId"
                  placeholder="Lecturer ID"
                  onChange={this.handleInputChange}
                />
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={this.handlePick}
              >
                Choose Course
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={this.deletePick}
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
