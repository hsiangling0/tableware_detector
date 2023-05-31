import React from "react";
import "./apply.css";
import {ReactComponent as Delete} from '../icons/delete.svg';
import { showPic } from "../utilities/api";
import { reportErr } from "../utilities/api";
export default class Apply extends React.Component{
  //活動id = this.props.match.params.id;
  constructor(props){
    super(props);
    this.state={
      isapply:false,
      amount:-1,
      preamount:0,
      url:"",
      picID:-1,
    }
    this.apply_text=this.apply_text.bind(this);
  }

  apply_text(){
    if(this.state.amount<0){
      alert("輸入值需大於零，請重新輸入");
    }
    else{
      reportErr(this.state.picID,this.state.amount)
      .then(()=>{
        alert("提交申請成功");
        this.setState({isapply:false});
        this.props.history.push('/tableware_detector/activities');
      })
      .catch((err)=>{
        alert("提交申請失敗，請重新提交");
        this.setState({isapply:false});
      })
    }
  }
  componentDidMount(){
    showPic(this.props.match.params.id)
    .then((res)=>{
      let index=res.length-1;
      this.setState({url:res[index].base64,preamount:res[index].num_friendly,picID:res[index].id})
    })
    .catch((err)=>{
      alert("操作錯誤，請重新執行");
    })
  }

    render() {
        return (
          <div>
            <div className="title">
              <h3>Activities</h3>
            </div>
            {this.state.url!=="" && <img id="upload-image" crossOrigin="anonymous" width="340px" height="250px" src={this.state.url}/>}
            <div className="data_r">
                <div className="row_r">
                    <span className="title_r">eco-friendly items:</span>
                    <span className="amounts">{this.state.preamount}</span>
                </div>
                <button className="apply_button" onClick={()=>this.setState({isapply:true,amount:-1})} >申請人工審查</button>
            </div>
            {this.state.isapply&&<div className="popup">
            <div className="popup-inner">
                <div className="close-btn" onClick={()=>this.setState({isapply:false})}>
                    <Delete width="35" height="35" className='app_delete' alt='delete_icon'/>
                </div>
                <h3 className='ask'>申請人工審查</h3>
                <input style={{margin: "6vh 0"}}type="text" placeholder={"請輸入預期環保物品數量"} onChange={(e)=>this.setState({amount:e.target.value})}></input>
                <button className="concert" onClick={()=> this.apply_text(this)}>確定</button>
            </div>
        </div>}
          </div>
        );
      }
}