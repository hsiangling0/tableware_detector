import React from "react";
import "./activities.css";
import { Link } from 'react-router-dom';
import withAuth from "../utilities/withAuth";
import { getActivities } from "../utilities/api";
export default class Activities extends React.Component{
constructor(props){
  super(props);
  this.state={
    data:[],
  }
}
componentDidMount(){
  let id=localStorage.getItem('id');
  getActivities(id)
  .then((res)=>{
      res.sort((a,b)=>{
          return a.id - b.id;
      })
      this.setState({data:res});
    })
  .catch((err)=>{
    let list=document.querySelector(".list");
    list.innerHTML='<p>目前還沒有任何社團活動</p>';
  })
}
    render() {
        return withAuth(
          <div>
            <div className="title">
              <h3>Activities</h3>
            </div>
            <div className="list">
            {this.state.data.map((data,index)=>{
                return(
                  <div className="act_data" key={data.id}>
                  <span className="act_num">{index+1}</span>
                  <div className="act_info">
                    <div className="first_row_a">
                      <span className="activity_name">{data.name}</span>
                      <span className="date">{data.date.substr(0,10)}</span>
                    </div>
                    <div className="second_row_a">
                      {data.state==0&&<button className="state_e">已過期</button>}
                      {/* {data.state==1&&<Link to={`/tableware_detector/apply/${data.id}`}>
                      <button className="state">已上傳</button>
                    </Link>}
                      {data.state==null&&<Link to={`/tableware_detector/identify/${data.id}`}>
                      <button className="state_n">未上傳
                      </button>
                    </Link>} */}
                    </div>
                  </div>
                </div>)})
            }
            </div>
          </div>
        );
      }
}