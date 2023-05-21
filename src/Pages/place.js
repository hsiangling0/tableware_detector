import React from "react";
import "./place.css";
import {getPlaceTime} from '../utilities/api';
import {bookResources} from "../utilities/api";
import { abi } from "../utilities/contract";
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

export default class place extends React.Component{
  //活動id = this.props.match.params.id;
  data=["13:00-14:00","14:00-15:00","16:00-17:00","18:00-19:00"];
  constructor(props){
    super(props);
    this.state={
      date:"",
      ans:[],
      total:0,
      time:[],
    }
    this.buy_place=this.buy_place.bind(this);
    this.changeDate=this.changeDate.bind(this);
    this.deal=this.deal.bind(this);
  }
  imageRef = React.createRef();
  // you can see route information here...
  // componentDidMount() {
  //   console.log(this.props.match);
  //   const { id } = this.props.match.params;
  //   this.getPostHandler(id);
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.match.params.id !== prevProps.match.params.id) {
  //     const { id } = this.props.match.params;
  //     this.getPostHandler(id);
  //   }
  // }

  // getPostHandler = async (id) => {
  //   const { data } = await axios.get(
  //     `https://jsonplaceholder.typicode.com/posts/${id}`
  //   );

  //   this.setState({
  //     preamount:data.amount
  //   });
  // };

  changeDate(e){
    let date_format=e.target.value.replaceAll('-','');
    this.setState({date:date_format});
    let id=this.props.match.params.id;
    getPlaceTime(id,date_format)
    .then((res)=>{
      this.setState({time:res.free_hour});
    })
    .catch((err)=>{
      console.log(err);
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
  deal=async(e)=>{
    // if(this.state.ans.length<1){
    //     alert("請選擇至少一個時段");
    // }
    // else if(localStorage.getItem('metamask')==null){
    //   alert("請先連接MetaMask");
    // }
    // else{
      // const account=JSON.parse(localStorage.getItem('matamask'));
      // const web3=localStorage.getItem('web3');
      // console.log(account);
      // console.log(web3);
    //   const provider = new WalletConnectProvider({
    //     // infuraId: '3cb2eaaa46cc48828c9792f39afbe1be',
    //       rpc: {
    //         11155111: "https://rpc.sepolia.org",
    //       },
    //       chainId: 11155111,
    //       network: "arbitrum goerli",
    //     qrcodeModalOptions: {
    //       mobileLinks: [
    //         'rainbow',
    //         'metamask',
    //         'argent',
    //         'trust',
    //         'imtoken',
    //         'pillar',
    //         'gnosis',
    //         'opera',
    //         'operaTouch',
    //       ],
    //     },
    //   });
    //   var contract;
    //   var accounts;
    //   try {
    //     await provider.enable();
    //     const web3 = new Web3(provider);
    //     accounts = await web3.eth.getAccounts();
    //     localStorage.setItem('metamask',accounts[0]);
    //     contract = new web3.eth.Contract(abi,process.env.REACT_APP_SMART_CONTRACT,{
    //     from: accounts[0]
    //   });
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // window.location.href='dapp://hsiangling0.github.io/tableware_detector/trade';
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    const account=accounts[0];
    console.log(accounts);
    // const account=localStorage.getItem('metamask');
    const contract = new web3.eth.Contract(abi,process.env.REACT_APP_SMART_CONTRACT,{
          from: account
        });
    // console.log(contract);
    // console.log(contract);
    // console.log(web3);
    // console.log(account);
    let id=parseInt(this.props.match.params.id);
    let club=parseInt(localStorage.getItem('id'));
      try{
        let data=await contract.methods.BookResource(club,id,this.state.date,this.state.total).send({
          from: account
          });
        console.log(data);
        console.log("finish");
      }catch(err){
        console.log(err);
      }
  // }   
      // let hr=[];
      // this.state.ans.forEach((element) => {
      //   hr.push(parseInt(element));
      // });
      // let id=parseInt(this.props.match.params.id);
      // let club=parseInt(localStorage.getItem('id'));
      // bookResources(id,this.state.date,club,hr)
      // .then((res)=>{
      //   console.log(res);
      //   // this.props.history.push('/tableware_detector/trade');
      // })
      // .catch((err)=>{
      //   alert("交易失敗，請確認token數是否足夠");
      // })
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
            </div>
          </div>
        );
      }
}