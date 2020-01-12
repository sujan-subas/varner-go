import React from "react";
import { createSession } from "../clientAPI/clientAPI";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginForm: {
        handle: "",
        password: ""
      }
    };
  }

  handleInputChange(field, e) {
    this.setState({
      loginForm: {
        ...this.state.loginForm,
        [field]: e.target.value
      },
      isLoggingIn: false,
      error: null
    });
  }

  async handleLoginAttempt(e) {
    e.preventDefault();

    const { history } = this.props;
    const { handle, password } = this.state.loginForm;

    try {
      this.setState({
        isLoggingIn: true,
        error: null
      });
      const { token, error } = await createSession({ handle, password });

      if (error) {
        throw new Error(error);
      }
      if (!token) {
        throw new Error("No token recieved");
      }

      localStorage.setItem("qlique-token", token);
      history.push("/");
    } catch (error) {
      this.setState({
        error,
        isLoggingIn: false
      });
    }
  }
  showMessage(text, type) {
    return (
      <div className="row">
        <div className="center">{text}</div>
      </div>
    );
  }
  render() {
    const { isLoggingIn, error } = this.state;

    const loginLeft = {
      color: "var(--varner-green)",
      border: "var(--varner-dark)"
    };
    const loginRight = {
      color: "yellow"
    };

    return (
      <>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <div className="row">
              <div className="col-6 yellow" style={{ loginLeft }}>
                {" "}
                <h1 className="display-4 text-success ">Login</h1>
              </div>
              <div className="col-6" style={{ loginRight }}>
                <form>
                  <div className="form-row align-items-center">
                    <div className="col-auto">
                      <label className="sr-only" htmlFor="inlineFormInput">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Username"
                        value={this.state.loginForm.handle}
                        onChange={this.handleInputChange.bind(this, "handle")}
                      />
                    </div>
                    <div className="col-auto">
                      <label className="sr-only" htmlFor="inlineFormInputGroup">
                        Password
                      </label>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text">password</div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Password"
                          value={this.state.loginForm.password}
                          onChange={this.handleInputChange.bind(
                            this,
                            "password"
                          )}
                        />
                      </div>
                    </div>
                    <Link to="/orders">
                      <div className="col-auto">
                        <button
                          onClick={this.handleLoginAttempt.bind(this)}
                          className="btn btn-primary m-2"
                        >
                          Login
                        </button>
                      </div>
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            {isLoggingIn && <p> Logging in...</p>}
            {error && <p>Unable to log in: {error.message}</p>}
          </div>
        </div>
      </>
    );
  }
}
