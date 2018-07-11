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
      lecturers: {}
    };
    this.handleDelete = this.handleDelete.bind(this);
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

  render() {
    const { lecturers } = this.state;
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
                    ID ---> {lecturers.LecturerDetail}
                  </h6>
                  <p className="card-text">
                    Detail ---> {lecturers.LecturerDetail}
                  </p>
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
          </div>
        </div>
      </div>
    );
  }
}
