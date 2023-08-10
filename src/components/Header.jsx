import React, { Component } from "react";

export default class Header extends Component {
  handleLogOut = () => {
    localStorage.clear("authToken");
    window.location.assign("/login");
  };

  render() {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80% 20%",
        }}
      >
        <div
          style={{
            height: "10vh",
            backgroundColor: "#2e2eee",
            paddingLeft: "20px",
            textAlign: "left",
            color: "#fff",
            width: "100vw",
          }}
        >
          <h1
            style={{
              margin: "0px",
              paddinTop: "20px",
            }}
          >
            Explore Yourself
          </h1>
        </div>
        <div style={{ marginLeft: "-50px", marginTop: "15px" }}>
          {localStorage.getItem("authToken") && (
            <button onClick={this.handleLogOut}>Logout</button>
          )}
        </div>
      </div>
    );
  }
}
