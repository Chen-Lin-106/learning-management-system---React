import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import CourseHeader from "./CourseHeader";

export default class CourseDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showbutton: true,
      courses: {}
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    axios
      .get(`http://lmsdemomar.azurewebsites.net/api/course/${id}`)
      .then(response => {
        const courses = response.data;
        this.setState({ courses });
      });
  }

  handleDelete = event => {
    const { id } = this.props.match.params;
    axios
      .delete(`http://lmsdemomar.azurewebsites.net/api/course/${id}`)
      .then(response => {
        console.log(response);
      });
    swal("Deleted", "Item has been deleted", "success");
    this.setState({ showbutton: false });
  };

  render() {
    const { courses } = this.state;
    return (
      <div className="main">
        <CourseHeader />

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4 box-shadow">
                <img
                  className="card-img-top"
                  src="https://i.pinimg.com/originals/a2/21/8c/a2218ca943271618502c1c7b58f45ff7.jpg"
                  alt="Card"
                />
                <div key={courses.Id} className="card-body">
                  <h5 className="card-title">{courses.Name}</h5>
                  <h7 className="card-title">Code ---> {courses.CourseCode}</h7>
                  <p className="card-text">
                    Introuction ---> {courses.Introduction}
                  </p>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="btn-group">
                      <Link to={`/courses/edit/${courses.Id}`}>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </Link>
                      <Link to={`/courses/${courses.Id}`}>
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
                      <Link to="/courses">
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
          </div>
        </div>
      </div>
    );
  }
}
