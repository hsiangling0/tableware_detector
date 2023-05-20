import React from "react";
import "./activities.css";
import { Link } from 'react-router-dom';
import withAuth from "../utilities/withAuth";
import {getResources} from '../utilities/api';
export default class activities extends React.Component{
    constructor(props){
      super(props);
      this.state={
        data:[],
      }
  }
  componentDidMount(){
    getResources()
      .then((res)=>{
          res.sort((a,b)=>{
              return a.id - b.id;
          })
          this.setState({data:res});
        });    
  }
    render() {
        return withAuth(
          <div>
            <div className="title">
              <h3>Transaction</h3>
            </div>
            <div className="list">
              {this.state.data.map((data)=>{
                return(
                    <div className="act_data" key={data.id}>
                        <span className="act_num">{data.id}</span>
                        <div className="act_info">
                            <div className="first_row_a">
                                <span className="activity_name">{data.name}</span>
                                <span className="amount">{data.cost}VCN</span>
                            </div>
                            <div className="second_row_a">
                            <Link to={`/tableware_detector/place/${data.id}/${data.name}/${data.cost}`}>
                              <button className="state_n">租借</button>
                            </Link>
                            </div>
                        </div>
                    </div>)})
            }
            </div>
          </div>
        );
      }
}