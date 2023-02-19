import React from 'react';
import './popup.css';
import {ReactComponent as Delete} from '../icons/delete.svg';
export default function POPUP(props) {
    return (props.trigger)?(
        <div className="popup">
            <div className="popup-inner">
                <div className="close-btn" onClick={()=>props.setButton(false)}>
                    <Delete width="35" height="35" className='app_delete' alt='delete_icon'/>
                </div>
                <h3 className='ask'>是否確定上傳此照片</h3>
                <p className='ask_context'>提醒您，一次活動僅能上傳一張照片且上傳後無法更改。</p>
                <button className="concert" onClick={()=> props.setButton(false)}>確定</button>
            </div>
        </div>
    ):"";
}
