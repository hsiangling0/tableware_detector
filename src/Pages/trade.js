import React from "react";
import "./activities.css";
import { Link } from 'react-router-dom';
export default class activities extends React.Component{
    data=[
        {
           place: '圖書館討論室308',
           price:5,
           id:1,
        },
        {
            place: '社團博覽會5號攤位',
            price:5,
            id:2,
        },
        {
            place: '活動中心一樓前廣場',
            price:5,
            id:3,
        }

    ];
    render() {
        return (
          <div>
            <div className="title">
              <h3>Transaction</h3>
            </div>
            <div className="list">
              {this.data.map((data,index)=>{
                return(
                    <div className="act_data" key={index}>
                        <span className="act_num">{index+1}</span>
                        <div className="act_info">
                            <div className="first_row_a">
                                <span className="activity_name">{data.place}</span>
                                <span className="amount">{data.price}VCN</span>
                            </div>
                            <div className="second_row_a">
                            <Link to={`/tableware_detector/place/${data.id}/${data.place}/${data.price}`}>
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