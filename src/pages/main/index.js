import React, { Component } from "react";

import "./style.css";

import api from "../../services/api";
import Profile from "./components/Profile";
import Beatmaps from "./components/Beatmaps";

export default class Main extends Component {
  state = {
    username: "sen4n",
    userInfo: [],
    userBest: [],
    beatmapsInfo: [],
    pos: 0,
    limit: 10,
    mode: 0
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const response = await api(this.state.username, "get_user", this.state.mode)
      .then(response => response)
      .catch(error => error);

    if (response.length !== 0) {
      this.setState({
        userInfo: response
      });
      this.getBest();
    } else {
      alert("error");
      return;
    }
  };

  getBest = async () => {
    const { userInfo, limit, mode } = this.state;
    const response = await api(userInfo[0].user_id, "get_user_best", mode)
      .then(resolve => resolve)
      .catch(error => error);

    if (response.length < limit) {
      this.setState({
        limit: response.length,
        userBest: response
      });
    } else {
      this.setState({
        userBest: response
      });
    }

    this.getBeatmaps();
  };

  getBeatmaps = async () => {
    const { beatmapsInfo, userBest, pos, limit } = this.state;

    if (pos < limit) {
      const response = await api(
        null,
        "get_beatmaps",
        null,
        userBest[pos].beatmap_id
      )
        .then(response => response)
        .catch(error => error);

      this.setState({
        beatmapsInfo: [...beatmapsInfo, response[0]],
        pos: pos + 1
      });

      this.getBeatmaps();
    }
  };

  handleGmChange = event => {
    switch (event.target.value) {
      case "std":
        this.setState({ mode: 0 });
        break;
      case "mania":
        this.setState({ mode: 3 });
        break;
      case "taiko":
        this.setState({ mode: 1 });
        break;
      case "ctb":
        this.setState({ mode: 2 });
        break;
      default:
        this.setState({ mode: 0 });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.username.trim().length) {
      this.clear();
      this.getUser();
    } else {
      alert("empty");
    }
  };

  clear = () => {
    this.setState({
      username: "",
      userInfo: [],
      userBest: [],
      beatmapsInfo: [],
      pos: 0,
      limit: 10
    });
  };

  render() {
    return (
      <div className="content">
        <this.Form />
        <Profile userInfo={this.state.userInfo} />
        <Beatmaps
          beatmapsInfo={this.state.beatmapsInfo}
          userBest={this.state.userBest}
          limit={this.state.limit}
        />
      </div>
    );
  }

  Form = () => (
    <form onSubmit={this.handleSubmit}>
      <input
        placeholder="osu! username"
        onChange={event => this.setState({ username: event.target.value })}
        value={this.state.username}
        type="text"
      />
      <select onChange={this.handleGmChange}>
        <option value="std" selected>
          std
        </option>
        <option value="mania">mania</option>
        <option value="taiko">taiko</option>
        <option value="ctb">ctb</option>
      </select>
      <button type="submit">></button>
    </form>
  );
}
