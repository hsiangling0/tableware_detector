import React from "react";
import "./home.css";
import {getClub} from '../utilities/api';

export default class home extends React.Component{
    constructor(props){
        super(props);
        this.state={
          data:[],
        }
    }
    componentDidMount(){
        getClub()
        .then((res)=>{
            res.sort((a,b)=>{
                return b.token - a.token;
            })
            this.setState({data:res});
          });    
    }
    render() {
        return (
          <div className="home">
            <h4>TOP</h4>
            <div className="rank_title">
                <span className="title_context">CLUB</span>
                <span className="title_context">VOLUME</span>
            </div>
            <div className="rank_context">
            {this.state.data.map((data,index)=>{
                return(
                    <div className="rank_data" key={index}>
                    <span className="num">{index+1}</span>
                    <div className="photo"></div>
                    <div className="info">
                        <div className="first_row">
                            <span className="club">{data.name}</span>
                            <span className="amount">{data.token}VCN</span>
                        </div>
                        <div className="second_row">
                            <span className="id">{data.address.substr(0,5)}......{data.address.substr(-5)}</span>
                        </div>
                    </div>
                </div>)})
            }
            </div>
          </div>
        );
      }
}