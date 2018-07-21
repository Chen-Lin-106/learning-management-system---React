import React, { Component } from "react";

export default class Login extends Component {
  constructor() {
    super();
    this.state = { username: "", password: "" };
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserNameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { username, password } = this.state;
    const { history } = this.props;

    history.push("/dashboard");
  }

  render() {
    return (
      <form className="form-signin">
        <div className="text-center mb-4">
          <h1 className="h3 mb-3 font-weight-normal">Login to LMS</h1>
        </div>

        <div className="form-label-group">
          <input
            className="form-control"
            placeholder="User Name"
            value={this.state.username}
            onChange={this.handleUserNameChange}
            required
            autofocus
          />
        </div>

        <div className="form-label-group">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            required
          />
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button
          className="btn btn-lg btn-dark btn-block"
          type="submit"
          onClick={this.handleSubmit}
        >
          Sign in
        </button>
      </form>
    );
  }
}
