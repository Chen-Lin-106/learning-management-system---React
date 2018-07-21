import React, { Component } from "react";
import axios from "axios";
import DashboardHeader from "./DashboardHeader";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios
      .get(`http://lmsdemomar.azurewebsites.net/api/course`)
      .then(response => {
        const courses = response.data;
        const coursenumber = Object.keys(courses).length;
        this.setState({ courses, coursenumber });
      })
      .catch(e => {
        alert(e);
      });

    axios
      .get(`http://lmsdemomar.azurewebsites.net/api/student`)
      .then(response => {
        const students = response.data;
        const studentnumber = Object.keys(students).length;
        this.setState({ students, studentnumber });
      })
      .catch(e => {
        alert(e);
      });

    axios
      .get(`http://lmsdemomar.azurewebsites.net/api/lecturer`)
      .then(response => {
        const lecturers = response.data;
        const lecturernumber = Object.keys(lecturers).length;
        this.setState({ lecturers, lecturernumber });
      })
      .catch(e => {
        alert(e);
      });
  }
  render() {
    const courses = this.state;
    const students = this.state;
    const lecturers = this.state;
    return (
      <div>
        <DashboardHeader />
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Learning Managnment System - LMS</h1>
            <p className="lead text-muted">
              LMS is a application for the adminstration to plan, implement, and assess a specific school system 
            </p>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4 box-shadow">
                  <img
                    className="card-img-top"
                    src="https://i.pinimg.com/originals/a2/21/8c/a2218ca943271618502c1c7b58f45ff7.jpg"
                    alt="Card cap"
                  />
                <div className="card-body">
                    <span className="badge badge-secondary badge-pill">
                      {courses.coursenumber}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card mb-4 box-shadow">
                  <img
                    className="card-img-top"
                    src="https://easykey.uk/images/vgift/barry-avatar-400.png"
                    alt="Card cap"
                  />
                <div className="card-body">
                    <span className="badge badge-secondary badge-pill">
                      {students.studentnumber}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card mb-4 box-shadow">
                  <img
                    className="card-img-top"
                    src="http://www.hexatar.com/gallery/png/151204_094136_m35fd66e783.png"
                    alt="Card cap"
                  />
                <div className="card-body">
                    <span className="badge badge-secondary badge-pill">
                      {lecturers.lecturernumber}
                    </span>
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
