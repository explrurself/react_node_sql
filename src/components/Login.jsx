import React, { Component } from "react";
import axios from "axios";
import Constants from "../Helper/Constants";
import { Navigate, Link } from "react-router-dom";

export default class Login extends Component {
  state = {
    phone: 0,
    password: "",
    message: "",
    notification: false,
    loading: false,
    redirect: false,
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLogin = (e) => {
    this.setState({ loading: true });
    e.preventDefault();

    let payload = {
      password: this.state.password,
      phone: this.state.phone,
    };

    axios
      .post(Constants.post_url.login, payload)
      .then((resp) => {
        // console.log(resp);
        localStorage.setItem("authToken", resp.data.token);
        if (resp.data.status === "success") {
          this.setState({ message: resp.data.message, notification: true });
          setTimeout(() => {
            this.setState({
              message: "",
              notification: false,
              loading: false,
              redirect: true,
            });
            window.location.assign("/profile")
          }, 2500);
        } else {
          this.setState({
            notification: true,
            message: "Some Error Occured!!",
          });
          setTimeout(() => {
            this.setState({
              notification: false,
              message: "",
              loading: false,
            });
          }, 2500);
        }
      })
      .catch((err) => {
        // console.log(err);
        this.setState({
          notification: true,
          message: err.response.data.message.msg
            ? err.response.data.message.msg
            : err.response.data.message,
        });
        setTimeout(() => {
          this.setState({
            notification: false,
            message: "",
            loading: false,
          });
        }, 2500);
      });
  };

  render() {
    if (this.state.redirect) {
      <Navigate
        to={{
          pathname: "/profile",
        }}
      />;
    } else {
      return (
        <div>
          {this.state.notification ? (
            <div
              style={{
                marginTop: "30px",
                borderRadius: "10px",
                height: "4rem",
                width: "30vw",
                color: "#fff",
                textAlign: "center",
                backgroundColor: "green",
                display: "flex",
                justifyContent: "center",
                marginLeft: "20px",
              }}
            >
              {/* Message */}
              {this.state.message}
            </div>
          ) : null}
          <div className="login-wrapper">
            <h1>Already Registered! Login Here</h1>
            <form onSubmit={this.handleLogin}>
              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Contact No"
                  onChange={this.handleInput}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  onChange={this.handleInput}
                />
              </div>
              <button type="submit">Login</button>
            </form>
            Not Registered!{" "}
                <Link
                  to={{
                    pathname: "/",
                  }}
                >
                  {" "}
                  Click here
                </Link>{" "}
                to Register!
          </div>
        </div>
      );
    }
  }
}
