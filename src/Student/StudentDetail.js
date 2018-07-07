import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import StudentHeader from "./StudentHeader";

export default class StudentDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showbutton: true,
      students: {}
    };
    this.handleDelete = this.handleDelete.bind(this);
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
    axios
      .delete(`http://lmsdemomar.azurewebsites.net/api/student/${id}`)
      .then(response => {
        console.log(response);
      });
    swal("Deleted", "Item has been deleted", "success");
    this.setState({ showbutton: false });
  };

  render() {
    const { students } = this.state;
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
                  <h7 className="card-title">
                    ID ---> {students.StudentDetail}
                  </h7>
                  <p className="card-text">
                    Detail ---> {students.StudentDetail}
                  </p>
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
          </div>
        </div>
      </div>
    );
  }
}
