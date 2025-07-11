import React, { Component } from "react";
import "./footer.sass";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().getFullYear(),
    };
  }
  render() {
    return (
      <div className="footer-area text-center bg-dark">
        <span>
          {" "}
          {this.state.date} Blockchain - Based on{" "}
          <a
            href="https://www.youtube.com/channel/UCnxrdFPXJMeHru_b4Q_vTPQ"
            target="_blank"
            rel="noreferrer"
          >
            Simply Explained - Savjee
          </a>{" "}
          videos.
        </span>
      </div>
    );
  }
}

export default Footer;
