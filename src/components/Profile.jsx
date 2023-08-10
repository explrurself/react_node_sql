import React, { Component } from "react";

import Constants from "../Helper/Constants";
import axios from "axios";

const fd = new FormData();

export default class Profile extends Component {
  state = {
    profileDetails: {},
    profile_pic: "",
    notification: false,
    loading: false,
    message: "",
  };

  componentDidMount() {
    this.getSingleUser();
  }

  getSingleUser = () => {
    axios
      .get(Constants.get_url.getSingleUser, {
        headers: { Authorization: localStorage.getItem("authToken") },
      })
      .then((resp) => {
        console.log(resp);
        this.setState({
          profileDetails: resp.data.data,
        });
      });
  };

  newFunc = (e) => {
    console.log(e.target.files[0])
    fd.append("profile_pic", e.target.files[0]);

    axios
      .put(Constants.put_url.update_profile, fd, {
        headers: { Authorization: localStorage.getItem("authToken") },
      })
      .then((resp) => {
        fd.delete("profile_pic");
        console.log(resp);
        if (resp.data.status === "success") {
          this.setState({
            notification: true,
            message: resp.data.message,
          });
          setTimeout(() => {
            this.setState(
              {
                notification: false,
                message: "",
              },
              () => {
                this.getSingleUser();
              }
            );
          }, 2500);
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          notification: true,
          message:  err.response.data?.message,
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
        <div>
          <div className="profile_container">
            <div className="image_container">
              <img
                src={Constants.img_url + this.state.profileDetails.profile_pic}
                alt=""
              />
              <input
                type="file"
                name="profile_pic"
                onChange={(e) => {
                  this.newFunc(e);
                }}
              />
              {/* <button onClick>Update Profile Image</button> */}
            </div>
            <div className="profile_details">
              <div>
                <span>Name: {this.state.profileDetails.name} </span>
              </div>
              <div>
                <span>Email: {this.state.profileDetails.email} </span>
              </div>
              <div>
                <span>Contact No: {this.state.profileDetails.phone} </span>
              </div>
              <div>
                <span>Profile Status: {this.state.profileDetails.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
