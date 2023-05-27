import React from 'react';
import './upload.css';
import * as tf from '@tensorflow/tfjs';
import {ReactComponent as Images} from '../icons/Images.svg';
import POPUP from './popup';
import { load_model } from "../utilities/loadmodel";
import {buildDetectedObjects} from "../utilities/buildOJ";
import '@tensorflow/tfjs-backend-webgl';
tf.setBackend('webgl');
const threshold = 0.6;
export default class UPLOAD extends React.Component{
    constructor(props){
      super(props);
      this.state={
        button:false,
        friendly:0,
        unfriendly:0,
        imageURL:null,
        canvasURL:null,//set to backend
        showCanvas:false,  
      }
      this.setButton=this.setButton.bind(this);
      this.uploadImage=this.uploadImage.bind(this);
      // this.renderPredictions=this.renderPredictions.bind(this);
    }
  imageRef = React.createRef();
  canvasRef = React.createRef();
    
      detectFrame = (video, model) => {
        tf.engine().startScope();
        model.executeAsync(this.process_input(video)).then(predictions => {
          this.renderPredictions(predictions, video);
          tf.engine().endScope();
        });
      };
    
      process_input(video_frame) {
        const tfimg = tf.browser.fromPixels(video_frame).toInt();
        const expandedimg = tfimg.transpose([0, 1, 2]).expandDims();
        return expandedimg;
      };
    
      
    
      renderPredictions = predictions => {
        const canvas = this.canvasRef.current;
        const img=this.imageRef.current;
        canvas.width=340;
        canvas.height=250;
        const ctx= canvas.getContext("2d");
        // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        ctx.drawImage(img, 0, 0,340,250);
        var eco=0;
        var noteco=0;
        // Font options.
        const font = "16px sans-serif";
        ctx.font = font;
        ctx.textBaseline = "top";
        //Getting predictions
        const boxes = predictions[2].arraySync();
        const scores = predictions[0].arraySync();
        const classes = predictions[4].dataSync();
        const detections = buildDetectedObjects(scores, threshold,
          boxes, classes,document.getElementById('upload-image'));
        detections.forEach(item => {
          const x = item['bbox'][0];
          const y = item['bbox'][1];
          const width = item['bbox'][2];
          const height = item['bbox'][3];
    
          // Draw the bounding box.
          if(item["class"]%2==0){
            ctx.strokeStyle = "#C7C7E2";
            ctx.fillStyle = "#C7C7E2";
            noteco++;
          }
          else{
            ctx.strokeStyle = "#FFBD9D";
            ctx.fillStyle = "#FFBD9D";
            eco++;
          }
          
          ctx.lineWidth = 4;
          ctx.strokeRect(x, y, width, height);
          // Draw the label background.
          const textWidth = ctx.measureText(item["label"] + " " + (100 * item["score"]).toFixed(2) + "%").width;
          const textHeight = parseInt(font, 10); // base 10
          ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
        });
        detections.forEach(item => {
          const x = item['bbox'][0];
          const y = item['bbox'][1];
    
          // Draw the text last to ensure it's on top.
          ctx.fillStyle = "#000000";
          ctx.fillText(item["label"] + " " + (100 * item["score"]).toFixed(2) + "%", x, y);
        });
        this.setState({friendly:eco,unfriendly:noteco,canvasURL:canvas.toDataURL()});
      };
  startIdentify(){
    this.setState({showCanvas:true});
    if(this.state.imageURL!==null){
      const modelPromise = new Promise((resolve, reject) => {resolve(load_model());});
      modelPromise
      .then(values => {
        this.detectFrame(this.imageRef.current, values);
      })
      .catch(error => {
        console.error(error);
      });
    }
    else{
      alert("Please upload a photo.");
    }
  }
  setButton(e,value){
    this.setState({ button: value,shutdown:value });
  }
  createImageFromFile(img, file) {
	return new Promise((resolve, reject) => {    
    img.src = URL.createObjectURL(file);
    this.setState({
      imageURL:img.src
    });
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve(img);
    };
    img.onerror = () => reject('Failure to load image.');
  });
}

getFileBase64Encode(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}



  uploadImage = (e) => {
    const { files } = e.target
    const imgDOM=document.getElementById('upload-image');
    const p1 = this.createImageFromFile(imgDOM, files[0]);
    const p2 = this.getFileBase64Encode(files[0]);
    this.setState({showCanvas:false});
	  Promise.all([p1, p2])
  	.then(result => {
    	const [img, b64] = result;
      // fixed image width, height
      img.width = 340;
      img.height = 250;
    });
    }
    render(){
      return (this.props.trigger)?(
        <div className="upload-page">
            <div className='upload_button' >
                <Images width="48" height="48" className='app_upload' alt='upload_icon'/>
                <span className='upload_title'>upload</span>
                <input className="file" type="file" accept='image/*' onChange={this.uploadImage}/>
            </div>
            <div className='input'>
            <img id="upload-image" crossOrigin="anonymous" width="340px" height="250px" ref={this.imageRef}/>
            {this.state.showCanvas&&<canvas className="size" ref={this.canvasRef} src={this.state.canvasURL} />}
            </div>
            <div className='uploaded_button'>
                <button className="pop" onClick={()=> this.startIdentify()} style={{background: "#FFBD9D"}} >辨識</button>
                <button className="pop" onClick={()=> this.setButton(this,true)}>確定</button>
                <POPUP trigger={this.state.button} activity_id={this.props.activity_id} num={this.state.friendly} base64={this.state.canvasURL} setButton={this.setButton}></POPUP>
            </div>
            <div className="data_r">
                <div className="row_r">
                    <span className="title_r">eco-friendly items:</span>
                    <span className="amounts">{this.state.friendly}</span>
                </div>
                <div className="row_r">
                    <span className="title_r">not eco-friendly items:</span>
                    <span className="amounts">{this.state.unfriendly}</span>
                </div>
            </div>
        </div>
    ):"";
    }
    
}