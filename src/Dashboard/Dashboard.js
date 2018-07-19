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
        <section class="jumbotron text-center">
          <div class="container">
            <h1 class="jumbotron-heading">Learning Managnment System - LMS</h1>
            <p class="lead text-muted">
              LMS is a system focus on manage for Course,
              Student, Lecturer
            </p>
          </div>
        </section>

        <div class="album py-5 bg-light">
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <div class="card mb-4 box-shadow">
                  <img
                    class="card-img-top"
                    src="https://i.pinimg.com/originals/a2/21/8c/a2218ca943271618502c1c7b58f45ff7.jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <span class="badge badge-secondary badge-pill">
                      {courses.coursenumber}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="card mb-4 box-shadow">
                  <img
                    class="card-img-top"
                    src="https://easykey.uk/images/vgift/barry-avatar-400.png"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <span class="badge badge-secondary badge-pill">
                      {students.studentnumber}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="card mb-4 box-shadow">
                  <img
                    class="card-img-top"
                    src="http://www.hexatar.com/gallery/png/151204_094136_m35fd66e783.png"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <span class="badge badge-secondary badge-pill">
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
