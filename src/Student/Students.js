import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import StudentHeader from "./StudentHeader";

export default class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      students: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://lmsdemomar.azurewebsites.net/api/student`)
      .then(response => {
        const students = response.data;
        this.setState({ students });
      })
      .catch(e => {
        alert(e);
      });
  }

  render() {
    const { students } = this.state;
    return (
      <div className="main">
        <StudentHeader />

        <div className="row mb-2 coursecard">
          {students.map(student => (
            <div key={student.Id} className="col-md-6">
              <div className="card flex-md-row mb-4 box-shadow h-md-250">
                <div className="card-body d-flex flex-column align-items-start">
                  <strong className="d-inline-block mb-2 text-primary">
                    Student Card
                  </strong>
                  <h3 className="mb-0">
                    <Link
                      className="text-dark"
                      to={`/students/${student.Id}`}
                    >
                      {student.Name}
                    </Link>
                  </h3>
                  <div className="mb-1 text-muted">
                    <Link
                      className="text-dark"
                      to={`/students/${student.Id}`}
                    >
                    Student ID -- {student.Id}
                  </Link>
                  </div>
                  <p className="card-text mb-auto"></p>
                  <strong className="d-inline-block mb-2 text-primary">
                     Enrolled Course: {(student.Enrollments.map(a => a.Course)).map(b => b.Name)}
                  </strong>
                </div>
                <img
                  className="card-img-right flex-auto d-none d-md-block coursecard-img"
                  src="https://easykey.uk/images/vgift/barry-avatar-400.png"
                  alt="Card"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Enrolled Course</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.Id}>
                  <td><Link to={`/students/${student.Id}`}>{student.Id}</Link></td>
                  <td><Link to={`/students/${student.Id}`}>{student.Name}</Link></td>
                  <td>{(student.Enrollments.map(a => a.Course)).map(b => b.Name)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
