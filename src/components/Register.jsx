import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Constants from "../Helper/Constants";

export default class Register extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    dateOfBirth: "",
    message: "",
    notification: false,
    redirect: false,
    loading: false,
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleRegister = (e) => {
    this.setState({ loading: true });
    e.preventDefault();

    let payload = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      dateOfBirth: this.state.dateOfBirth,
      gender: this.state.gender,
      phone: this.state.phone,
    };

    axios
      .post(Constants.post_url.register, payload)
      .then((resp) => {
        // console.log(resp);
        localStorage.setItem("authToken", resp.data.token);
        if (resp?.data.status === "success") {
          this.setState({ message: resp.data.message, notification: true });
          setTimeout(() => {
            this.setState({
              message: "",
              notification: false,
              loading: false,
              redirect: true,
            });
            window.location.assign("/profile");
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
          message: err.response?.data.message.msg
            ? err.response?.data.message.msg
            : err.response?.data.message,
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
          <div className="main-div">
            <div className="register-wrapper">
              <h1>Register Yourself!!</h1>
              <form onSubmit={this.handleRegister}>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={this.handleInput}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleInput}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Contact Number"
                    onChange={this.handleInput}
                  />
                </div>
                <div>
                  <span>
                    Male:{" "}
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={this.handleInput}
                    />
                  </span>
                  <span>
                    Female:
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={this.handleInput}
                    />
                  </span>
                </div>
                <div>
                  <input
                    type="date"
                    name="dateOfBirth"
                    onChange={this.handleInput}
                  />
                </div>
                <div>
                  <input
                    type="passowrd"
                    name="password"
                    placeholder="Enter Password"
                    onChange={this.handleInput}
                  />
                </div>
                <div>
                  <button type="submit">Register</button>
                </div>
                Already Registered!{" "}
                <Link
                  to={{
                    pathname: "/login",
                  }}
                >
                  {" "}
                  Click here
                </Link>{" "}
                to login!
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}
