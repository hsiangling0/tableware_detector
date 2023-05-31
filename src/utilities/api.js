import { customFetch } from "./customApi";

export const getClub =()=>
    customFetch('/users','GET',false);

export const login = (club_id,passwd) =>
    customFetch('/users/login','POST',false,{},{id:club_id,password:passwd});

export const getTokenNum = (club_id) =>
    customFetch('/users/user','GET', false,{club_id:club_id});

export const updataAddrOrPasswd = (club_id,passwd,name,address)=>
    customFetch('/users/update','PATCH',true,{club_id:club_id},{password:passwd,name:name,address:address});

export const getActivities=(club_id)=>
    customFetch('/activities','GET',false,{club_id:club_id});

export const uploadPic=(num_friendly,date,activity_id,base64)=>
    customFetch('/pictures/upload','POST',true,{},{num_friendly:num_friendly,date:date,activity_id:activity_id,base64:base64});

export const getResources = () =>
    customFetch('/resources','GET',false);

export const bookResources = (resource_id,booked_day,club_id,hr) =>
    customFetch('/resources/book','POST',true,{},{resource_id:resource_id,booked_day:booked_day,club_id:club_id,hr:hr});

export const bookBlockChain = (resource_id,booked_day,club_id,hr) =>
customFetch('/resources/book/blockchain','POST',true,{},{resource_id:resource_id,booked_day:booked_day,club_id:club_id,hr:hr});

export const getPlaceTime =(place_id,date)=>
    customFetch('/resources/free','GET',false,{resource_id:place_id,booked_day:date});

export const showPic = (activity_id) =>
    customFetch('/pictures','GET',false,{activity_id:activity_id})

export const reportErr = (reportErr_picID,num_friendly) =>
    customFetch('pictures/reportErr','POST',true,{},{reportErr_picID:reportErr_picID,num_friendly:num_friendly})