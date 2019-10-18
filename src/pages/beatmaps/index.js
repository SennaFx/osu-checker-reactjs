import React, { Component } from "react";

import api from "../../services/api";

import "./style.css";

export default class App extends Component {
  state = {
    beatmap: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await api(null, "get_beatmaps", null, id)
      .then(response => response)
      .catch(error => error);

    this.setState({
      beatmap: response[0]
    });

    console.log(response);
  }

  render() {
    const { beatmap } = this.state;
    return (
      <div className="beatmap">
        <div>
          <h3>
            {beatmap.title} - {beatmap.artist} [{beatmap.version}] //{" "}
            {beatmap.creator}
          </h3>
          <h3>
            Difficulty: ✰ {parseFloat(beatmap.difficultyrating).toFixed(1)}
          </h3>
          <h3>Song length: {parseInt(beatmap.total_length)}s</h3>
          <div>
            <p>AR: {beatmap.diff_approach}</p>
            <p>OD: {beatmap.diff_overall}</p>
            <p>HP: {beatmap.diff_drain}</p>
            <p>CS: {beatmap.diff_size}</p>
          </div>
        </div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://osu.ppy.sh/b/${beatmap.beatmap_id}`}
        >
          go to osu website
        </a>
      </div>
    );
  }
}
