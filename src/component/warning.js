import React from 'react';

import {ReactComponent as Delete} from '../icons/delete.svg';
import { Link } from 'react-router-dom';
export default function WARNING(props) {
    return (props.trigger)?(
        <div className="popup">
            <div className="popup-inner">
                <div className="close-btn" onClick={()=>props.setBack(false)}>
                    <Delete width="35" height="35" className='app_delete' alt='delete_icon'/>
                </div>
                <h3 className='ask'>是否確定離開</h3>
                <p className='ask_context'>提醒您，照片尚未上傳，現在離開照片將無法儲存。</p>
                <Link to="/tableware_detector/activities" className="concert" onClick={()=> props.setBack(false)}>
                    <button className="concert">確定</button>
                </Link>
            </div>
        </div>
    ):"";
}
