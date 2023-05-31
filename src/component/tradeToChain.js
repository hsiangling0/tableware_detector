import React from 'react';
import {bookBlockChain} from '../utilities/api';
import {ReactComponent as Delete} from '../icons/delete.svg';
import { Link } from 'react-router-dom';
export default function CHAIN(props) {
    const concertTrade=()=>{
        bookBlockChain(props.resource_id,props.date,props.club_id,props.hr)
        .then((res)=>{
            console.log(res);
            // props.setButton(false);
        })
        .catch((err)=>{
            alert("空間購買失敗，請重新執行");
             // props.setButton(false);
        })
    }
    return (props.trigger)?(
        <div className="popup">
            <div className="popup-inner">
                <div className="close-btn" onClick={()=>props.setBack(false)}>
                    <Delete width="35" height="35" className='app_delete' alt='delete_icon'/>
                </div>
                <h3 className='ask'>是否確定購買此時段</h3>
                <p className='ask_context'>提醒您，交易確認後將無法取消，請再次確認時段及空間是否正確。<br/><br/>交易結果將於三分鐘內發送更新。</p>
                <Link to="/tableware_detector/trade" className="concert" onClick={concertTrade}>
                    <button className="concert">確定</button>
                </Link>
            </div>
        </div>
    ):"";
}
