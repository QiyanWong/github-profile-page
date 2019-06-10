import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        avatar_url: " ",
        login: " ",
        name: " ",
        company: " ",
        blog: " ",
        location: " "
      },
      navi: {
        public_repos: " ",
        followers: " ",
        following: " ",
        followers_url: " ",
        following_url: " "
      }
    };
  }
  componentDidMount() {
    axios.get("https://api.github.com/users/octocat").then(res => {
      let user = this.state.user;
      let navi = this.state.navi;
      for (let key in res.data) {
        if (user[key]) {
          user[key] = res.data[key];
        } else if (navi[key]) {
          navi[key] = res.data[key];
        }
      }
      this.setState({
        user: user,
        navi: navi
      });
    });
  }
  render() {
    return (
      <div className="home-container">
        <UserInfo user={this.state.user} />
        <NaviBar navi={this.state.navi} />
      </div>
    );
  }
}

const UserInfo = props => {
  return (
    <div className="left">
      <ul>
        <img alt="avatar" id="avatar" src={props.user.avatar_url} />
        <div id="info-space">
          <li id="name" className="info-list">
            {props.user.name}
          </li>
          <li id="login" className="info-list">
            {props.user.login}
          </li>
          <button id="edit-profile">Follow</button>
        </div>
        <li className="info-list">{props.user.company}</li>
        <li className="info-list">{props.user.blog}</li>
        <li className="info-list">{props.user.location}</li>
      </ul>
    </div>
  );
};

const NaviBar = props => {
  const [curTab, setCurTab] = useState("Overview");
  return (
    <div className="right">
      <nav className="naviBar">
        <a className="naviTab" href=" ">
          Overview
        </a>
        <a className="naviTab" href=" ">
          Repositories<span className="number">{props.navi.public_repos}</span>
        </a>
        <a className="naviTab" href=" ">
          Projects<span className="number">{0}</span>
        </a>
        <a className="naviTab" href=" ">
          Stars<span className="number">{12}</span>
        </a>
        <a className="naviTab" href={props.navi.followers_url}>
          Followers<span className="number">{props.navi.followers}</span>
        </a>
        <a className="naviTab" href={props.navi.following_url}>
          Following<span className="number">{props.navi.following}</span>
        </a>
      </nav>
      <p>Pinned</p>
      <div className="pinned-container">
        <div className="pinned" />
        <div className="pinned" />
        <div className="pinned" />
        <div className="pinned" />
        <div className="pinned" />
        <div className="pinned" />
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
