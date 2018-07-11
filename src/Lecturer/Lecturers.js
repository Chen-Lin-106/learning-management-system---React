import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LecturerHeader from "./LecturerHeader";

export default class Lecturers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      lecturers: [],
      details: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://lmsdemomar.azurewebsites.net/api/lecturer`)
      .then(response => {
        const lecturers = response.data;
        const details = lecturers.map(a => a.LecturerDetail);
        console.log(details);
        this.setState({ lecturers });
      })
      .catch(e => {
        alert(e);
      });
  }

  render() {
    const { lecturers } = this.state;
    return (
      <div className="main">
        <LecturerHeader />

        <div className="row mb-2 coursecard">
          {lecturers.map(lecturer => (
            <div key={lecturer.Id} className="col-md-6">
              <div className="card flex-md-row mb-4 box-shadow h-md-250">
                <div className="card-body d-flex flex-column align-items-start">
                  <strong className="d-inline-block mb-2 text-primary">
                    Lecturer Card
                  </strong>
                  <h3 className="mb-0">
                    <Link
                      className="text-dark"
                      to={`/lecturers/${lecturer.Id}`}
                    >
                      {lecturer.Name}
                    </Link>
                  </h3>
                  <strong className="d-inline-block mb-2 text-primary" />
                </div>
                <img
                  className="card-img-right flex-auto d-none d-md-block coursecard-img"
                  src="http://www.hexatar.com/gallery/png/151204_094136_m35fd66e783.png"
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
              </tr>
            </thead>
            <tbody>
              {lecturers.map(lecturer => (
                <tr key={lecturer.Id}>
                  <td>{lecturer.Id}</td>
                  <td><Link to={`/lecturers/${lecturer.Id}`}>{lecturer.Name}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
