import React from "react";
import "./account.css";
import {ReactComponent as Account} from '../icons/account_data.svg';
import {ReactComponent as Apply} from '../icons/recheck_apply.svg';
import {ReactComponent as Question} from '../icons/question.svg';
import {ReactComponent as Logout} from '../icons/logout.svg';
import {ReactComponent as Delete} from '../icons/delete.svg';
import {getClub} from '../utilities/api';
import {login} from '../utilities/api';
import {getTokenNum} from '../utilities/api';
import {updataAddrOrPasswd} from '../utilities/api';

export default class account extends React.Component{
  constructor(props){
    super(props);
    this.state={
      option1:false,
      option2:false,
      login:false,
      pwd:'',
      address:'',
      tmpaddress:'',
      newpwd:'',
      data:[],
      name:'',
      clubID:0,
      token:0,
    }
    this.setLogin=this.setLogin.bind(this);
    this.loginCheck=this.loginCheck.bind(this);
    this.updateAddress=this.updateAddress.bind(this);
    this.updatePassword=this.updatePassword.bind(this);
  }
  setLogin(e,value){
    this.setState({login:value});
  }
  loginCheck(){
        if(this.state.pwd==""){
            alert("請輸入密碼");
        }
        else{
          let club_name=this.state.data[this.state.clubID];
          login(this.state.clubID+1,this.state.pwd)
          .then((res) => {
              localStorage.clear();
              localStorage.setItem('token', JSON.stringify(res.token));
              localStorage.setItem('id', JSON.stringify(this.state.clubID+1));
              localStorage.setItem('passwd', JSON.stringify(this.state.pwd));
              localStorage.setItem('name', JSON.stringify(club_name));
              this.setState({login:true,name:club_name})
        })
        .then(()=>{
            let token;
            let add;
            getTokenNum(this.state.clubID+1)
            .then((res)=>{
                localStorage.setItem('token_num', JSON.stringify(res.token));
                localStorage.setItem('address', JSON.stringify(res.address));
                token=res.token;
                add=res.address;
                this.setState({token:token,address:add});
            })
        })
          .catch(()=>{
              alert("密碼錯誤");
          }
          )
        }
    }
    updateAddress(){
      if(this.state.tmpaddress==""){
          alert("請輸入MetaMask地址");
      }
      else{
        let id=localStorage.getItem('id');
        updataAddrOrPasswd(id,this.state.pwd,this.state.name,this.state.tmpaddress)
        .then((res)=>{
          localStorage.setItem('address', JSON.stringify(res.address));
          this.setState({option1:false,address:res.address});
        })
        .catch((err)=>{
          console.log(err);
          alert("更改錢包地址失敗，請注意地址格式是否正確");
          this.setState({option1:false});
        })
      }
    }
    updatePassword(){
      if(this.state.newpwd==""){
        alert("密碼不得設為空");
      }
      else{
        let id=localStorage.getItem('id');
        updataAddrOrPasswd(id,this.state.newpwd,this.state.name,this.state.address)
        .then((res)=>{
          console.log(res);
          localStorage.setItem('password', JSON.stringify(res.password));
          this.setState({option2:false});
        })
        .catch((err)=>{
          console.log(err);
          alert("更改密碼失敗");
          this.setState({option2:false});
        })
      }
   }
   componentDidMount(){
    let temp=[];
    if(localStorage.getItem('token')!==null){
      let token;
      let add;
      let id=localStorage.getItem('id');
      getTokenNum(id)
      .then((res)=>{
        localStorage.setItem('token_num', JSON.stringify(res.token));
        localStorage.setItem('address', JSON.stringify(res.address));
        token=res.token;
        add=res.address;
        let name=JSON.parse(localStorage.getItem('name'));
      this.setState({login:true,name:name,token:token,address:add});
      })
      
    }
    else{
      getClub()
        .then((res)=>{
          res.sort((a,b)=>{
            return a.id-b.id;
          })
          res.forEach((element) => {
            temp.push(element.name);
          });
          this.setState({data:temp});
        })
    }
      
   }

    render() {
        return(this.state.login) ?(
          <div>
            <div className="account_title">
              <div className="account_photo"></div>
              <div className="acc_info">
                <div className="first_row_a">
                  <span className="club_a">{this.state.name}</span>
                  <span className="amount">{this.state.token}EFT</span>
                </div>
                <div className="second_row">
                  <span className="id">{this.state.address.substr(0,5)}......{this.state.address.substr(-5)}</span>
                </div>
              </div>
            </div>
            <h4 className="manage">管理</h4>
            <div className="choice_a">
              <div className="row" onClick={()=>this.setState({option1:true,tmpaddress:''})}>
                <Account width="54" height="54" className='app_account' alt='account_icon'/>
                <span className="function">更改錢包地址</span>
              </div>
              <div className="row" onClick={()=>this.setState({option2:true,newpwd:''})}>
                <Apply width="54" height="54" className='app_apply' alt='apply_icon'/>
                <span className="function">更改帳號密碼</span>
              </div>
              <div className="row">
                <Question width="54" height="54" className='app_question' alt='question_icon'/>
                <span className="function">使用說明</span>
              </div>
              <div className="row" style={{border:"none"}} onClick={()=>{this.setState({login:false});localStorage.removeItem('token');}}>
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
                <input type="text" className="address" placeholder={"請輸入MetaMask地址"} onChange={(e)=>this.setState({tmpaddress:e.target.value})}></input>
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
                <input type="password" className="password" placeholder={"請輸入新密碼"} onChange={(e)=>this.setState({newpwd:e.target.value})}></input>
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
              <select className="selected" value={this.state.clubID} placeholder={"請選擇社團名稱"} onChange={(e)=>this.setState({clubID:parseInt(e.target.value)})}>
              {this.state.data.map((data,index)=>{
              return(
                  <option key={index} value={index}>{data}</option>)})
              }
              </select>
          </div>
          <div className='content_title'>密碼</div>
          <input type="password" placeholder={"請輸入密碼"} onChange={(e)=>this.setState({pwd:e.target.value})}></input>
          </div>
          
          <button className="concert" onClick={()=> this.loginCheck(this)}>登入</button>
      </div>
        );
      }
}