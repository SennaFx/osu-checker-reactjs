import React, { Component } from "react";

import { Link } from "react-router-dom";

import "./style.css";

export default class Beatmaps extends Component {
  render() {
    const { beatmapsInfo, userBest, limit } = this.props;
    if (beatmapsInfo.length === limit)
      return (
        <div className="beatmaps">
          {beatmapsInfo.map((item, index) => (
            <article key={userBest[index].beatmap_id}>
              <strong>{item.title}</strong>
              <p>Score: {parseFloat(userBest[index].score)}</p>
              <p>
                Combo: {userBest[index].maxcombo} / {item.max_combo}
              </p>
              <p>PP: {Math.round(userBest[index].pp)}</p>
              <p>Rank: {userBest[index].rank}</p>
              <Link to={`/beatmap/${userBest[index].beatmap_id}`}>visit</Link>
            </article>
          ))}
        </div>
      );
    else return <span>Loading...</span>;
  }
}
