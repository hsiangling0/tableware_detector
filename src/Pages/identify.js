import React from "react";
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import "./identify.css";
import POPUP from '../component/popup';
import UPLOAD from '../component/upload';
import { load_model } from "../utilities/loadmodel";
import {buildDetectedObjects} from "../utilities/buildOJ";
import {ReactComponent as Back} from '../icons/back.svg';
import WARNING from '../component/warning';

tf.setBackend('webgl');
// http-server -c1 --cors .
const threshold = 0.6;
export default class Identify extends React.Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();
  constructor(props){
    super(props);
    this.state={
      button:false,
      friendly:0,
      unfriendly:0,
      page:false,
      shutdown:false,
      switch:false,
      back:false,
      canvasURL:null,
    }
    this.setButton=this.setButton.bind(this);
    this.setPage=this.setPage.bind(this);
    this.setBack=this.setBack.bind(this);
  }
  // constructor(props) {
  //   super(props);

  //   this.model = null;
  //   this.modelLastUpdated = null;

  //   this.state = {
  //     modelLoaded: false,
  //     filename: '',
  //     isModelLoading: false,
  //     isClassifying: false,
  //     predictions: [],
  //     photoSettingsOpen: true,
  //     modelUpdateAvailable: false,
  //     showModelUpdateAlert: false,
  //     showModelUpdateSuccess: false,
  //     isDownloadingModel: false
  //   };
  // }

  

  componentDidMount() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "environment"
          }
        })
        .then(stream => {
          window.stream = stream;
          this.videoRef.current.srcObject = stream;
          return new Promise((resolve, reject) => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        });

      const modelPromise = load_model();
      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          this.detectFrame(this.videoRef.current, values[0]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  detectFrame = (video, model) => {
    tf.engine().startScope();
    model.executeAsync(this.process_input(video)).then(predictions => {
      this.renderPredictions(predictions, video);
      requestAnimationFrame(() => {
        if(this.state.shutdown){
          //enter button and save image
          // let photo = this.photoRef.current;
          // let ctx = photo.getContext('2d')
          // ctx.drawImage(video, 0, 0,400,300)
          return;
        }
        this.detectFrame(video, model);
      });
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
    const img=this.videoRef.current;
    canvas.width=400;
    canvas.height=300;
    const ctx= canvas.getContext("2d");
        
    ctx.drawImage(img, 0, 0,400,300);
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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
      boxes, classes,document.getElementById('frame'));
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
  setButton(e,value){
    this.setState({ button: value,shutdown:value });
  }
  setBack(e,value){
    this.setState({ shutdown:value,back:value });
  }
  setPage(e,value){
    // let temp=this.state.shutdown;
    this.setState({page:value,shutdown:value,switch:value});
    var page1=document.querySelector(".page1");
    var upload1=document.querySelector(".upload");
    var real1=document.querySelector(".realtime");
    if(value){
      page1.style.display="none";
      upload1.style.borderBottom="0.5px solid #000000";
      upload1.style.color="#000000";
      real1.style.borderBottom="0.5px solid #adadad";
      real1.style.color="#8E8E8E";
    }
    else{
      page1.style.display="block";
      real1.style.borderBottom="0.5px solid #000000";
      real1.style.color="#000000";
      upload1.style.borderBottom="0.5px solid #adadad";
      upload1.style.color="#8E8E8E";
      this.componentDidMount();
    }
  }
  render() {
    return (
      <div>
        <div className="back" >
          <Back width="35" height="35" className='app_back' alt='back_icon' onClick={()=> this.setBack(this,true)}></Back>
        </div>
        <div className="title_identify">
          <h3>Detection</h3>
        </div>
        <div className="choice">
          <a className="realtime" onClick={()=> this.setPage(this,false)}>real-time</a>
          <a className="upload" onClick={()=> this.setPage(this,true)}>upload</a>
        </div>
        <div className="page1">
          <div className="input_identify">
          <video
          className="size"
          autoPlay
          playsInline
          muted
          ref={this.videoRef}
          width="400"
          height="300"
          id="frame"
        />
        <canvas
          className="size"
          ref={this.canvasRef}
        />
        {/* <canvas className="container" ref={this.photoRef} width="400"
          height="300"></canvas> */}
        </div>
        
        <h4 className="current">當前數據</h4>
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
        <button className="pop" onClick={()=> this.setButton(this,true)}>確定</button>
        <POPUP trigger={this.state.button} activity_id={this.props.match.params.id} num={this.state.friendly} base64={this.state.canvasURL} setButton={this.setButton}></POPUP>
        <WARNING trigger={this.state.back} setBack={this.setBack}></WARNING>
        </div>
        <UPLOAD trigger={this.state.page} setButton={this.setButton} activity_id={this.props.match.params.id}></UPLOAD>
      </div>
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
