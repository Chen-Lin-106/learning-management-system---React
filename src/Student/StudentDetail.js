import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import StudentHeader from "./StudentHeader";

export default class StudentDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: {},
      enrolment: {}
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.deletePick = this.deletePick.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    axios
      .get(`http://lmsdemomar.azurewebsites.net/api/student/${id}`)
      .then(response => {
        const students = response.data;
        this.setState({ students });
      });
  }

  handleDelete = event => {
    const { id } = this.props.match.params;
    const { match: { params }, history } = this.props;
    axios
      .delete(`http://lmsdemomar.azurewebsites.net/api/student/${id}`)
      .then(() => {
      history.push('/students');
      });
    swal("Deleted", "Item has been deleted", "success");
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    const enrolment = { ...this.state.enrolment };
    enrolment[name] = value;
    this.setState({ enrolment });
    console.log(enrolment);
  };

  handlePick(e) {
    e.preventDefault();
    const { enrolment } = this.state;
    const { match: { params }, history } = this.props;
    axios
      .post(`http://lmsdemomar.azurewebsites.net/api/enrolment`, enrolment)
      .then(() => {
      history.push('/students');
      });
    swal("Great!", "Course has been choose sucessfully", "success");
  }

  deletePick(e) {
    e.preventDefault();
    const { enrolment } = this.state;
    const { match: { params }, history } = this.props;
    axios
      .delete(`http://lmsdemomar.azurewebsites.net/api/enrolment`, {data:enrolment})
      .then(() => {
      history.push('/students');
      });
    swal("Deleted", "Item has been deleted", "success");
  }

  render() {
    const { students } = this.state;
    const { enrolment } = this.state;
    return (
      <div className="main">
        <StudentHeader />

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4 box-shadow">
                <img
                  className="card-img-top"
                  src="https://easykey.uk/images/vgift/barry-avatar-400.png"
                  alt="Card"
                />
                <div key={students.Id} className="card-body">
                  <h5 className="card-title">{students.Name}</h5>
                  <h6 className="card-title">ID ---> {students.Id}</h6>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="btn-group">
                      <Link to={`/students/edit/${students.Id}`}>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </Link>
                      <Link to={`/students/${students.Id}`}>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={this.handleDelete}
                          >
                            Delete
                          </button>

                      </Link>
                      <Link to="/students">
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
            <div className="col-md-2">
              <input
                className="form-control"
                value={enrolment.StudentID}
                name="StudentID"
                placeholder={students.Id}
                onChange={this.handleInputChange}
                required
              />
              <input
                className="form-control"
                value={enrolment.CourseID}
                name="CourseID"
                placeholder="Course ID"
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
