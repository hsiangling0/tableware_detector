import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Routes from './Routes.js';
import './App.css';
import icon from './icons/logo_t.svg';
import { ReactComponent as Rank } from './icons/rank.svg';
import { ReactComponent as Activ } from './icons/activity.svg';
import { ReactComponent as Trade } from './icons/trade.svg';
import { ReactComponent as User } from './icons/User.svg';
import { ReactComponent as Wallet } from './icons/wallet.svg';
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';
// async function connectWallet(){
//   if (typeof window.ethereum !== 'undefined') {
//     const web3 = new Web3(window.ethereum);
//     try {
//       await window.ethereum.enable();
//       const accounts = await web3.eth.getAccounts();
//       return accounts;
//     } catch (error) {
//       return error;
//       console.error(error);
//     }
//   }
// }
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active_home: true,
      active_activity: false,
      active_identify: false,
      active_account: false,
    };
    this.connectWalletAccount = this.connectWalletAccount.bind(this);
  }

  connectWalletAccount =async () => {
    const account=JSON.parse(localStorage.getItem('matamask'));
    if(account!=null) {
          alert("您已連接MetaMask帳號");
          return;
    }
    const provider = new WalletConnectProvider({
      // infuraId: '3cb2eaaa46cc48828c9792f39afbe1be',
        rpc: {
          11155111: "https://rpc.sepolia.org",
        },
        chainId: 11155111,
        network: "arbitrum goerli",
      qrcodeModalOptions: {
        mobileLinks: [
          'rainbow',
          'metamask',
          'argent',
          'trust',
          'imtoken',
          'pillar',
          'gnosis',
          'opera',
          'operaTouch',
        ],
      },
    });

    try {
      await provider.enable();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      localStorage.setItem('metamask',accounts[0]);
      localStorage.setItem('web3',web3);
      const web=localStorage.getItem('web3');
      const account=localStorage.getItem('metamask');
      // this.setState({ web3:web3, account: accounts[0] });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="App">
        <div className='app_title'>
          <img src={icon} width="35" height="35" className='app_icon' alt='icon' />
          <span className='app_name'>NCKU</span>
          <Wallet width="48" height="48" className='app_wallet' alt='wallet_icon' onClick={() => this.connectWalletAccount(this)}></Wallet>
        </div>
        <div className="middle">
          <Routes />
        </div>
        {/* <Container> */}

        {/* </Container> */}
        <div className='footer'>
          <NavLink to="/tableware_detector/" className="list" activeClassName="list-active" exact>
            <Rank width="48" height="48" className='app_rank' alt='rank_icon' />
          </NavLink>
          <NavLink to="/tableware_detector/activities" className="list" activeClassName="list-active">
            <Activ  width="48" height="48" className='app_activ' alt='activities_icon' />
          </NavLink>
          <NavLink to="/tableware_detector/trade" className="list" activeClassName="list-active">
            <Trade  width="48" height="48" className="app_trade" alt="trade_icon" />
          </NavLink>
          <NavLink to="/tableware_detector/account" className="list" activeClassName="list-active">
            <User width="48" height="48" className='app_user' alt='user_icon' />
          </NavLink>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  updateAvailable: PropTypes.bool.isRequired,
};

export default withRouter(App);