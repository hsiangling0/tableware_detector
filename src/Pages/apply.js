import React from "react";
import "./apply.css";
import axios from "axios";
import {ReactComponent as Delete} from '../icons/delete.svg';
export default class apply extends React.Component{
  //活動id = this.props.match.params.id;
  constructor(props){
    super(props);
    this.state={
      isapply:false,
      amount:-1,
      preamount:0,
    }
    this.apply_text=this.apply_text.bind(this);
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

  apply_text(){
    if(this.state.amount<0){
      alert("輸入值需大於零，請重新輸入");
    }
    else{
      this.setState({isapply:false});
    }
  }
  
    render() {
        return (
          <div>
            <div className="title">
              <h3>Activities</h3>
            </div>
            <img id="upload-image" crossOrigin="anonymous" width="340px" height="250px" ref={this.imageRef}/>
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