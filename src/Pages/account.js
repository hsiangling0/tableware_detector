import React from "react";
import "./account.css";
import {ReactComponent as Account} from '../icons/account_data.svg';
import {ReactComponent as Apply} from '../icons/recheck_apply.svg';
import {ReactComponent as Question} from '../icons/question.svg';
import {ReactComponent as Logout} from '../icons/logout.svg';
import {ReactComponent as Delete} from '../icons/delete.svg';
import axios from "axios";


export default class account extends React.Component{
  constructor(props){
    super(props);
    this.state={
      option1:false,
      option2:false,
      login:false,
      select:this.data[0],
      pwd:'',
      address:'',
      origin:'',
      newpwd:'',
    }
    this.setLogin=this.setLogin.bind(this);
    this.login=this.login.bind(this);
    this.updateAddress=this.updateAddress.bind(this);
    this.updatePassword=this.updatePassword.bind(this);
  }
  setLogin(e,value){
    this.setState({login:value});
  }
  data=["成大流舞社","成大熱音社","成大籃球社"];
  // userRequest = axios.create({
  //   baseURL: 'http://localhost:8080',
  //   headers: { 'Content-Type': 'application/json' },
  //   })

  // checkToken(){
  //       return userRequest.post("/login",
  //       JSON.stringify({
  //       select,
  //       pwd})
  //       ).then((res) => res.data).catch((err)=>err.toString());
  // }
  login(){
        if(this.state.select==""){
            alert("請選擇社團名稱");
        }
        else if(this.state.pwd==""){
            alert("請輸入密碼");
        }
        else{
          this.setState({login:true});
        }
        // connect to backend
        // else{
        //     checkToken().then((e)=>{
        //         if(e.token==null)alert("密碼錯誤");
        //         props.setLogin(true);
        //     })
        // }
    }
    updateAddress(){
      if(this.state.address==""){
          alert("請輸入MetaMask地址");
      }
      else{
        this.setState({option1:false});
      }
    }
    updatePassword(){
      if(this.state.origin==""){
        alert("請輸入原密碼");
      }
      else if(this.state.newpwd==""){
        alert("請輸入新密碼");
      }
      else if(this.state.origin!=="1234"){
        alert("原密碼錯誤，請重新輸入");
      }
      else{
        this.setState({option2:false});
      }
  }
    render() {
        return(this.state.login) ?(
          <div>
            <div className="account_title">
              <div className="account_photo"></div>
              <div className="acc_info">
                <div className="first_row_a">
                  <span className="club_a">{this.state.select}</span>
                  <span className="amount">524VCN</span>
                </div>
                <div className="second_row">
                  <span className="id">{this.state.address}</span>
                </div>
              </div>
            </div>
            <h4 className="manage">管理</h4>
            <div className="choice_a">
              <div className="row" onClick={()=>this.setState({option1:true,address:''})}>
                <Account width="54" height="54" className='app_account' alt='account_icon'/>
                <span className="function">更改錢包地址</span>
              </div>
              <div className="row" onClick={()=>this.setState({option2:true,origin:'',newpwd:''})}>
                <Apply width="54" height="54" className='app_apply' alt='apply_icon'/>
                <span className="function">更改帳號密碼</span>
              </div>
              <div className="row">
                <Question width="54" height="54" className='app_question' alt='question_icon'/>
                <span className="function">使用說明</span>
              </div>
              <div className="row" style={{border:"none"}} onClick={()=>this.setState({login:false})}>
                <Logout width="54" height="54" className='app_logout' alt='logout_icon'/>
                <span className="function" >登出</span>
              </div>
            </div>
            {this.state.option1&&
            <div className="popup">
              <div className="popup-inner">
                <div className="close-btn" onClick={()=>this.setState({option1:false})}>
                    <Delete width="35" height="35" className='app_delete' alt='delete_icon'/>
                </div>
                <h3 className='ask'>更改MetaMask帳戶地址</h3>
                <input type="text" className="address" placeholder={"請輸入MetaMask地址"} onChange={(e)=>this.setState({address:e.target.value})}></input>
                <button className="concert"onClick={()=> this.updateAddress(this)}>確定</button>
              </div>
            </div>}
            {this.state.option2&&
            <div className="popup">
              <div className="popup-inner">
                <div className="close-btn" onClick={()=>this.setState({option2:false})}>
                    <Delete width="35" height="35" className='app_delete' alt='delete_icon'/>
                </div>
                <h3 className='ask'>更改帳戶密碼</h3>
                <input type="text" className="password" placeholder={"請輸入原密碼"} onChange={(e)=>this.setState({origin:e.target.value})}></input>
                <input type="text" className="password" placeholder={"請輸入新密碼"} onChange={(e)=>this.setState({newpwd:e.target.value})}></input>
                <button className="concert"onClick={()=> this.updatePassword(this)}>確定</button>
              </div>
            </div>}
          </div>

        ):(
          <div className="login">
          <div className="title">
              <h3>Log in</h3>
          </div>
          <div className='frame'>
              <div className='content_title'>社團名稱</div>
          <div className="choose">
              <select className="selected" value={this.state.select}placeholder={"請選擇社團名稱"} onChange={(e)=>this.setState({select:e.target.value})}>
              {this.data.map((data,index)=>{
              return(
                  <option key={index} value={data}>{data}</option>)})
              }
              </select>
          </div>
          <div className='content_title'>密碼</div>
          <input type="password" placeholder={"請輸入密碼"} onChange={(e)=>this.setState({pwd:e.target.value})}></input>
          </div>
          
          <button className="concert" onClick={()=> this.login(this)}>登入</button>
      </div>
        );
      }
}