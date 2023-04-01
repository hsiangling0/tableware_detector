import React from "react";
import "./activities.css";
import { Link } from 'react-router-dom';
export default class activities extends React.Component{
  data=[
    {
       title: '寒訓',
       date:'2023/2/10-2023/2/15',
       state:1, //已上傳
    },
    {
      title: '社團博覽會',
      date:'2023/2/20-2023/2/23',
      state:2, //未上傳
    },
    {
      title: '成果發表會',
      date:'2023/5/18-2023/5/19',
      state:0, //過期
    }

];
    render() {
        return (
          <div>
            <div className="title">
              <h3>Activities</h3>
            </div>
            <div className="list">
            {this.data.map((data,index)=>{
                return(
                  <div className="act_data" key={index}>
                  <span className="act_num">{index+1}</span>
                  <div className="act_info">
                    <div className="first_row_a">
                      <span className="activity_name">{data.title}</span>
                      <span className="date">{data.date}</span>
                    </div>
                    <div className="second_row_a">
                      {data.state==0&&<button className="state_e">已過期</button>}
                      {data.state==1&&<button className="state">已上傳</button>}
                      {data.state==2&&<Link to="/tableware_detector/identify">
                      <button className="state_n">未上傳
                      </button>
                    </Link>}
                    </div>
                  </div>
                </div>)})
            }
            </div>
          </div>
        );
      }
}