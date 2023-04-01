import { PropTypes } from 'prop-types';
import React, { Component,useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
// import AlertDismissable from './components/AlertDismissable';
import Routes from './Routes.js';
import './App.css';
import icon from './icons/logo_t.svg';
import {ReactComponent as Rank}from './icons/rank.svg';
import {ReactComponent as Activ} from './icons/activity.svg';
import {ReactComponent as Trade} from './icons/trade.svg';
import {ReactComponent as User} from './icons/User.svg';
import {ReactComponent as Wallet} from './icons/wallet.svg';
import Web3 from 'web3';

async function connectWallet(){
  if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      return accounts;
    } catch (error) {
      console.error(error);
    }
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    // const reloadMsg = `
    //   New content is available.<br />
    //   Please <a href='javascript:location.reload();'>reload</a>.<br />
    //   <small>If reloading doesn't work, close all tabs/windows of this web application,
    //   and then reopen the application.</small>
    // `;
    const precolor="#adadad";
    const postcolor="#2894FF";
    this.state = {
      active_home:true,
      active_activity:false,
      active_identify:false,
      active_account:false,
      account:"",
      // showUpdateAlert: true,
      // reloadMsg: reloadMsg
    };
    this.changeColor=this.changeColor.bind(this);
    this.connectWalletAccount=this.connectWalletAccount.bind(this)
  }
  changeColor(value){
    this.setState({
      active_home:value===1? true:false,
      active_activity:value===2? true:false,
      active_identify:value===3?true:false,
      active_account:value===4?true:false,
    })
  }
  connectWalletAccount(){
    connectWallet().then(accounts=>{
      this.setState({account:accounts[0]});
      console.log(this.state.account)})
    // console.log(accounts);
    // this.setState({account:accounts});
  }
  // dismissUpdateAlert = event => {
  //   this.setState({ showUpdateAlert: false });
  // }
    //  <Container>
    //         <Navbar collapseOnSelect className="app-nav-bar" variant="dark" expand="lg">
    //           <Navbar.Brand href="/">WebClassify</Navbar.Brand>
    //           <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //           <Navbar.Collapse id="basic-navbar-nav">
    //             <Nav className="">
    //               <Link className="nav-link" to="/">Classify</Link>
    //               <Link className="nav-link" to="/about">About</Link>
    //             </Nav>
    //           </Navbar.Collapse>
    //         </Navbar>
    //         { this.props.updateAvailable && this.state.showUpdateAlert &&
    //           <div style={{paddingTop: '10px'}}>
    //             {/* <AlertDismissable
    //               title=""
    //               variant="info"
    //               message={this.state.reloadMsg}
    //               show={this.props.updateAvailable && this.state.showUpdateAlert}
    //               onClose={this.dismissUpdateAlert} /> */}
    //           </div>
    //         }
    //       </Container>
  render() {
    return (
        <div className="App">
          <div className='app_title'>
            <img src={icon} width="35" height="35" className='app_icon' alt='icon'/>
            <span className='app_name'>NCKU</span>
            <Wallet width="48" height="48" className='app_wallet' alt='wallet_icon' onClick={()=>this.connectWalletAccount(this)}></Wallet>
          </div>
          <div className="middle">
             <Routes />
          </div>
          {/* <Container> */}
           
          {/* </Container> */}
          <div className='footer'>
            <Link to="/tableware_detector/" className="list" onClick={()=> this.changeColor(this,1)}>
              <Rank fill={this.state.active_home?this.postcolor:this.precolor} width="48" height="48" className='app_rank' alt='rank_icon'/>
            </Link>
            <Link to="/tableware_detector/activities" className="list" onClick={()=> this.changeColor(this,2)}>
              <Activ fill={this.state.active_activity?this.postcolor:this.precolor} width="48" height="48" className='app_activ' alt='activities_icon'/>
            </Link>
            <Link to="/tableware_detector/trade" className="list" onClick={()=> this.changeColor(this,3)}>
              <Trade fill={this.state.active_identify?this.postcolor:this.precolor} width="48" height="48" className="app_trade" alt="trade_icon" />
            </Link>
            <Link to="/tableware_detector/account" className="list" onClick={()=> this.changeColor(this,4)}>
              <User fill={this.state.active_account?this.postcolor:this.precolor} width="48" height="48" className='app_user' alt='user_icon'/>
            </Link> 
          </div>
        </div>
    );
  }
}

App.propTypes = {
  updateAvailable: PropTypes.bool.isRequired,
};

export default withRouter(App);