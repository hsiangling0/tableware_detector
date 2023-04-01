import React from "react";
import "./home.css";
import search from '../icons/search.svg';

export default class home extends React.Component{
    data=[
        {
           club: '成大流舞社',
           amount:820,
           address:'0x971003c...0915f',
        },
        {
            club: '成大熱音社',
            amount:524,
            address:'0x981025l...0914h',
        },
        {
            club: '成大籃球社',
            amount:128,
            address:'0x990811d...0320h',
        },
        {
            club: '成大吉他社',
            amount:106,
            address:'0x000922s...0208i',
        }
    
    ];
    render() {
        return (
          <div className="home">
            <div className="search">
                <img src={search} width="30" height="30" className='app_search' alt='search_icon'/>
                <span className="search_alt">search for the club...</span>
            </div>
            <h4>TOP</h4>
            <div className="rank_title">
                <span className="title_context">CLUB</span>
                <span className="title_context">VOLUME</span>
            </div>
            <div className="rank_context">
            {this.data.map((data,index)=>{
                return(
                    <div className="rank_data" key={index}>
                    <span className="num">{index+1}</span>
                    <div className="photo"></div>
                    <div className="info">
                        <div className="first_row">
                            <span className="club">{data.club}</span>
                            <span className="amount">{data.amount}VCN</span>
                        </div>
                        <div className="second_row">
                            <span className="id">{data.address}</span>
                        </div>
                    </div>
                </div>)})
            }
            </div>
          </div>
        );
      }
}