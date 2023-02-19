import React from "react";
import "./activities.css";

export default class activities extends React.Component{
    render() {
        return (
          <div>
            <div className="title">
              <h3>Activities</h3>
            </div>
            <div className="list">
              <div className="act_data">
                <span className="act_num">1</span>
                <div className="act_info">
                  <div className="first_row_a">
                    <span className="activity_name">寒訓</span>
                    <span className="date">2023/2/10-2023/2/15</span>
                  </div>
                  <div className="second_row_a">
                    <button className="state">已上傳</button>
                    <span className="amount">5VCN</span>
                  </div>
                </div>
              </div>
              <div className="act_data">
                <span className="act_num">1</span>
                <div className="act_info">
                  <div className="first_row_a">
                    <span className="activity_name">社團博覽會</span>
                    <span className="date">2023/2/20-2023/2/23</span>
                  </div>
                  <div className="second_row_a">
                    <button className="state_n">未上傳</button>
                    <span className="amount"></span>
                  </div>
                </div>
              </div>
              <div className="act_data">
                <span className="act_num">1</span>
                <div className="act_info">
                  <div className="first_row_a">
                    <span className="activity_name">成果發表會</span>
                    <span className="date">2023/5/18-2023/5/19</span>
                  </div>
                  <div className="second_row_a">
                    <button className="state_n">未上傳</button>
                    <span className="amount"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
}