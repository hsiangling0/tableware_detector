import React from "react";
import "./account.css";
import {ReactComponent as Account} from '../icons/account_data.svg';
import {ReactComponent as Apply} from '../icons/recheck_apply.svg';
import {ReactComponent as Question} from '../icons/question.svg';
import {ReactComponent as Logout} from '../icons/logout.svg';

export default class account extends React.Component{
    render() {
        return (
          <div>
            <div className="account_title">
              <div className="account_photo"></div>
              <div className="acc_info">
                <div className="first_row_a">
                  <span className="club_a">成大流舞社</span>
                  <span className="amount">524VCN</span>
                </div>
                <div className="second_row">
                  <span className="id">0x981025l...0914h</span>
                </div>
              </div>
            </div>
            <h4 className="manage">管理</h4>
            <div className="choice_a">
              <div className="row">
                <Account width="54" height="54" className='app_account' alt='account_icon'/>
                <span className="function">個人帳號交易資料</span>
              </div>
              <div className="row">
                <Apply width="54" height="54" className='app_apply' alt='apply_icon'/>
                <span className="function">申請人工審查</span>
              </div>
              <div className="row">
                <Question width="54" height="54" className='app_question' alt='question_icon'/>
                <span className="function">使用說明</span>
              </div>
              <div className="row" style={{border:"none"}}>
                <Logout width="54" height="54" className='app_logout' alt='logout_icon'/>
                <span className="function">登出</span>
              </div>
            </div>
          </div>

        );
      }
}