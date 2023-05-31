import React from "react";
import "./place.css";
import {getPlaceTime} from '../utilities/api';
import {bookResources} from "../utilities/api";
import { abi } from "../utilities/contract";
import Web3 from 'web3';
import CHAIN from '../component/tradeToChain';
export default class Place extends React.Component{
  constructor(props){
    super(props);
    this.state={
      date:"",
      ans:[],
      total:0,
      time:[],
      button:false,
      club_id:"",
      hr:[],
    }
    this.buy_place=this.buy_place.bind(this);
    this.changeDate=this.changeDate.bind(this);
    this.deal=this.deal.bind(this);
    this.setBack=this.setBack.bind(this);
  }
  imageRef = React.createRef();
  setBack(value){
    this.setState({button:value});
  }
  changeDate(e){
    let date_format=e.target.value.replaceAll('-','');
    this.setState({date:date_format});
    let id=this.props.match.params.id;
    getPlaceTime(id,date_format)
    .then((res)=>{
      this.setState({time:res.free_hour});
    })
    .catch((err)=>{
      alert("操作錯誤，請回到購買頁面重新執行");
      window.location.href("/tableware_detector/trade");
    })
  }
  buy_place(e){
    const index=this.state.ans.findIndex((item)=>{
        return item===e.target.value;
    });
    var updateAns=this.state.ans;
    if(index==-1){
        updateAns.push(e.target.value);
    }
    else{
        updateAns=this.state.ans.filter((item)=>{
            return item!==e.target.value;
        })
    }
    const total_price=updateAns.length*this.props.match.params.price;
    this.setState({ans:updateAns,total:total_price});
  }
  // deal=async(e)=>{
    deal(){
      if(this.state.ans.length<1){
        alert("請選擇至少一個時段");
      }
    
    // window.location.href='dapp://hsiangling0.github.io/tableware_detector/trade';
    else if(localStorage.getItem('metamask')==null){
      alert("請先連接MetaMask才可執行交易");
    }
    else if(localStorage.getItem('metamask') != JSON.parse(localStorage.getItem('address'))){
      console.log(localStorage.getItem('metamask'));
      console.log(localStorage.getItem('address'));
      alert("串接的錢包地址並非此社團錢包地址，請重新串接或再次確認社團錢包地址");
    }
    else{
      let club=parseInt(localStorage.getItem('id'));
      let hr=[];
      this.state.ans.forEach((element) => {
        hr.push(parseInt(element));
      });
      this.setState({button:true,club_id:club,hr:hr});

    //   const web3 = new Web3(window.ethereum);
    //   const accounts = await web3.eth.requestAccounts();
    //   const account=accounts[0];
    //   const contract = new web3.eth.Contract(abi,process.env.REACT_APP_SMART_CONTRACT);
    //   let id=parseInt(this.props.match.params.id);
    //   let club=parseInt(localStorage.getItem('id'));
    //   let datime=this.state.date;
    //   let hr=[];
    //   this.state.ans.forEach((element) => {
    //     datime+=element;
    //     hr.push(parseInt(element));
    //   });
    //   try{
    //     let data=await contract.methods.BookResource(club,id,datime,this.state.total).send({
    //       from: account
    //     });
    //     bookResources(id,this.state.date,club,hr)
    //     .then((res)=>{
    //       console.log(res);
    //       this.props.history.push('/tableware_detector/trade');
    //     })
    //     .catch((err)=>{
    //       console.log(err);
    //     })
    // }catch(err){
    //   console.log(err);
    //   alert("交易失敗，請確認錢包內代幣數是否足夠");
    // }
    }
  };
  
    render() {
        return (
          <div>
            <div className="title">
              <h3>Transaction</h3>
            </div>
            <div className="place_data">
                <div className="place_context">
                    <div className="place_title">
                        <span className="title_context">Place: {this.props.match.params.placeName}
                        </span>
                    </div>
                    <div className="place_title">
                        <span className="title_context">date: 
                        </span>
                        <input className="date_input" type="date" onChange={(e)=>this.changeDate(e)}></input>
                    </div>
                </div>
                {this.state.date!==""&&
                <div>
                <div className="place_choose">
                {this.state.time.map((data,index)=>{
                return(
                  <li className="time" key={index}>
                  <input className="multicheckbox" type="checkbox" id={data} value={data} onChange={(e)=>this.buy_place(e)}></input>
                  <label htmlFor={data}>{data}:00-{data+1}:00</label>
                </li>)})
                }
                </div>
                <div className="total">{this.state.total}EFT</div>
                </div>
                }
                
                <button className="apply_button" style={{backgroundColor:"#C7C7E2"}}onClick={(e)=>this.deal(e)}>租借</button>
                <CHAIN trigger={this.state.button} setBack={this.setBack} resource_id={this.props.match.params.id} hr={this.state.hr} club_id={this.state.club_id} date={this.state.date}></CHAIN>
            </div>
          </div>
        );
      }
}