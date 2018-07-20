import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import LecturerHeader from "./LecturerHeader";

export default class LecturerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lecturers: {},
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
      .get(`http://lmsdemomar.azurewebsites.net/api/lecturer/${id}`)
      .then(response => {
        const lecturers = response.data;
        this.setState({ lecturers });
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
      .delete(`http://lmsdemomar.azurewebsites.net/api/lecturer/${id}`)
      .then(() => {
      history.push('/lecturers');
      });
    swal("Deleted", "Item has been deleted", "success");
  };

  handleInputChange(e) {
    e.preventDefault();
    this.setState({value: e.target.value});
  };

  deletePick(e) {
    e.preventDefault();
    const {lecturers } = this.state;
    const { history } = this.props;
    const {value } = this.state;
    console.log(value);
    console.log(lecturers.Id);
    axios
      .delete(`http://lmsdemomar.azurewebsites.net/api/teaching`, {data:{lecturerId:value, courseId:lecturers.Id}})
      .then(() => {
      history.push('/lecturers');
      });
    swal("Delete", "Course has been droped", "success");
  }

    handlePick(e) {
      e.preventDefault();
      const {lecturers } = this.state;
      const { history } = this.props;
      const {value } = this.state;
      axios
        .post(`http://lmsdemomar.azurewebsites.net/api/teaching`, {lecturerId:value, courseId:lecturers.Id})
        .then(() => {
        history.push('/lecturers');
        });
        swal("Great!", "Course has been choose sucessfully", "success");
      }

  render() {
    const { lecturers } = this.state;
    const { courses } = this.state;
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

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={this.handleDelete}
                          >
                            Delete
                          </button>

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
                Pick Course
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
