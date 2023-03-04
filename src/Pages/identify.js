import React from "react";
import { useState } from "react";
// import ReactDOM from "react-dom";
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import "./identify.css";
import POPUP from '../component/popup';
import UPLOAD from '../component/upload';
import { load_model } from "../utilities/loadmodel";
import {buildDetectedObjects} from "../utilities/buildOJ";
tf.setBackend('webgl');
// http-server -c1 --cors .
const threshold = 0.6;
// const INDEXEDDB_DB = 'tensorflowjs';
// const INDEXEDDB_STORE = 'model_info_store';
// const INDEXEDDB_KEY = 'web-model';

// async function load_model() {
//   // It's possible to load the model locally or from a repo
//   // You can choose whatever IP and PORT you want in the "http://127.0.0.1:8080/model.json" just set it before in your https server
//   const model = await loadGraphModel("http://127.0.0.1:8080/model.json");
//   // const model = await loadGraphModel("https://github.com/hsiangling0/object_detector_app/blob/main/models/tableware_detector/model.json");
//   // console.log(model.outputNodes);
//   return model;
// }


export default class identify extends React.Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();
  photoRef=React.createRef();
  constructor(props){
    super(props);
    this.state={
      button:false,
      friendly:0,
      unfriendly:0,
      page:false,
      shutdown:false,
      switch:false,
    }
    this.setButton=this.setButton.bind(this);
    this.setPage=this.setPage.bind(this)
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
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    var eco=0;
    var noteco=0;
    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    //Getting predictions
    const boxes = predictions[2].arraySync();
    const scores = predictions[6].arraySync();
    const classes = predictions[7].dataSync();
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
    this.setState({friendly:eco,unfriendly:noteco});
  };
  setButton(e,value){
    this.setState({ button: value,shutdown:value });
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
        <div className="title_identify">
          <h3>Detection</h3>
        </div>
        <div className="choice">
          <a className="realtime" onClick={()=> this.setPage(this,false)}>real-time</a>
          <a className="upload" onClick={()=> this.setPage(this,true)}>upload</a>
        </div>
        <div className="page1">
          <div className="input">
          <video
          className="size"
          autoPlay
          playsInline
          muted
          ref={this.videoRef}
          width="400"
          height="350"
          id="frame"
        />
        <canvas
          className="size"
          ref={this.canvasRef}
          width="450"
          height="350"
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
        <POPUP trigger={this.state.button} setButton={this.setButton}></POPUP>
        </div>
        <UPLOAD trigger={this.state.page} setButton={this.setButton}></UPLOAD>
      </div>
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
