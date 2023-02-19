import React from "react";
import "./home.css";
import search from '../icons/search.svg';

export default class home extends React.Component{
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
                <div className="rank_data">
                    <span className="num">1</span>
                    <div className="photo"></div>
                    <div className="info">
                        <div className="first_row">
                            <span className="club">成大流舞社</span>
                            <span className="amount">820VCN</span>
                        </div>
                        <div className="second_row">
                            <span className="id">0x971003c...0915f</span>
                        </div>
                    </div>
                </div>
                <div className="rank_data">
                    <span className="num">2</span>
                    <div className="photo"></div>
                    <div className="info">
                        <div className="first_row">
                            <span className="club">成大熱音社</span>
                            <span className="amount">524VCN</span>
                        </div>
                        <div className="second_row">
                            <span className="id">0x981025l...0914h</span>
                        </div>
                    </div>
                </div>
                <div className="rank_data">
                    <span className="num">3</span>
                    <div className="photo"></div>
                    <div className="info">
                        <div className="first_row">
                            <span className="club">成大籃球社</span>
                            <span className="amount">128VCN</span>
                        </div>
                        <div className="second_row">
                            <span className="id">0x990811d...0320h</span>
                        </div>
                    </div>
                </div>
                <div className="rank_data">
                    <span className="num">4</span>
                    <div className="photo"></div>
                    <div className="info">
                        <div className="first_row">
                            <span className="club">成大吉他社</span>
                            <span className="amount">106VCN</span>
                        </div>
                        <div className="second_row">
                            <span className="id">0x000922s...0208i</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );
      }
}