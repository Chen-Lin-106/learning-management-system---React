import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import CourseHeader from "./CourseHeader";

export default class CourseDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    const {
      match: { params },
      history
    } = this.props;
    axios
      .delete(`http://lmsdemomar.azurewebsites.net/api/course/${id}`)
      .then(() => {
        history.push("/courses");
      });
    swal("Deleted", "Item has been deleted", "success");
  };

  render() {
    const { courses } = this.state;
    return (
      <div className="main">
        <CourseHeader />

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4 box-shadow detail-card">
                <img
                  className="card-img-top"
                  src="https://i.pinimg.com/originals/a2/21/8c/a2218ca943271618502c1c7b58f45ff7.jpg"
                  alt="Card"
                />
                <div key={courses.Id} className="card-body">
                  <h5 className="card-title">{courses.Name}</h5>
                  <h6 className="card-title">ID ---> #{courses.Id}</h6>
                  <h6 className="card-title">Code ---> {courses.CourseCode}</h6>
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
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={this.handleDelete}
                        >
                          Delete
                        </button>
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
