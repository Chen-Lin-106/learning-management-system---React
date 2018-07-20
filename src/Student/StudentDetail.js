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
      courses: [],
      value: {}
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

  componentDidMount() {
    axios
      .get(`http://lmsdemomar.azurewebsites.net/api/course`)
      .then(response => {
        const courses = response.data;
        this.setState({ courses });
      });
  }

  handleDelete(e) {
    const { id } = this.props.match.params;
    const { history } = this.props;
    axios
      .delete(`http://lmsdemomar.azurewebsites.net/api/student/${id}`)
      .then(() => {
      history.push('/students');
      });
    swal("Deleted", "Item has been deleted", "success");
  };

  handleInputChange(e) {
    const value = this.state;
    e.preventDefault();
    this.setState({value: e.target.value});
    console.log(value);
  };

  handlePick(e) {
    e.preventDefault();
    const { history } = this.props;
    const { students } = this.state;
    const {value } = this.state;
    axios
      .post(`http://lmsdemomar.azurewebsites.net/api/enrolment`, {StudentID:students.Id, CourseID:value})
      .then(() => {
      history.push('/students');
      });
    swal("Great!", "Course has been choose sucessfully", "success");
  }

  deletePick(e) {
    e.preventDefault();
    const { history } = this.props;
    const { students } = this.state;
    const {value } = this.state;
    axios
      .delete(`http://lmsdemomar.azurewebsites.net/api/enrolment`, {data:{StudentID:students.Id, CourseID:value}})
      .then(() => {
      history.push('/students');
      });
    swal("Deleted", "Item has been deleted", "success");
  }

  render() {
    const { students } = this.state;
    const { courses } = this.state;
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
                  <h6 className="card-title">Student ID: {students.Id}</h6>
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
         <form>
              <label>
          Choose course:
          <select value={this.state.value} onChange={this.handleInputChange}>
            <option>Course List</option>
            { courses.map(course => (
                <option key={course.Id} value={course.Id}>#{course.Id} - {course.Name}</option>
            ))}
          </select>
        </label>
        </form>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={this.handlePick}
              >
                Enrol Course
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={this.deletePick}
              >
                Drop Course
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
