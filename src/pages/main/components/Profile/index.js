import React, { Component } from "react";

import "./style.css";

export default class Profile extends Component {
  render() {
    const { userInfo } = this.props;
    return (
      <div>
        {userInfo.map(item => (
          <div className="profile">
            <img src={`https://a.ppy.sh/${item.user_id}`} alt="profile pic" />
            <ul>
              <li>
                <p>ID:</p>
                <p>{item.user_id}</p>
              </li>
              <li>
                <p>Username:</p>
                <p>{item.username}</p>
              </li>
              <li>
                <p>Rank:</p>
                <p>#{parseFloat(item.pp_rank)}</p>
              </li>
              <li>
                <p>Accuracy:</p>
                <p>{parseFloat(item.accuracy).toFixed(2)}%</p>
              </li>
              <li>
                <p>PP:</p>
                <p>{Math.round(item.pp_raw)}</p>
              </li>
              <li>
                <p>Level:</p>
                <p>{Math.round(item.level)}</p>
              </li>
            </ul>
          </div>
        ))}
      </div>
    );
  }
}
