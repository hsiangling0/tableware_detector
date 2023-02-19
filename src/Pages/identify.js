import React from "react";
import { useState } from "react";
// import ReactDOM from "react-dom";
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { loadGraphModel } from '@tensorflow/tfjs-converter';
import "./identify.css";
import POPUP from '../component/popup'
tf.setBackend('webgl');
// http-server -c1 --cors .
const threshold = 0.6;
// const INDEXEDDB_DB = 'tensorflowjs';
// const INDEXEDDB_STORE = 'model_info_store';
const INDEXEDDB_KEY = 'web-model';

// async function load_model() {
//   // It's possible to load the model locally or from a repo
//   // You can choose whatever IP and PORT you want in the "http://127.0.0.1:8080/model.json" just set it before in your https server
//   const model = await loadGraphModel("http://127.0.0.1:8080/model.json");
//   // const model = await loadGraphModel("https://github.com/hsiangling0/object_detector_app/blob/main/models/tableware_detector/model.json");
//   // console.log(model.outputNodes);
//   return model;
// }
async function load_model() {
  var model='';
    if (('indexedDB' in window)) {
      try {
        model = await loadGraphModel('indexeddb://' + INDEXEDDB_KEY);

        // Safe to assume tensorflowjs database and related object store exists.
        // Get the date when the model was saved.
        // try {
        //   const db = await openDB(INDEXEDDB_DB, 1, );
        //   const item = await db.transaction(INDEXEDDB_STORE)
        //                        .objectStore(INDEXEDDB_STORE)
        //                        .get(INDEXEDDB_KEY);
        //   const dateSaved = new Date(item.modelArtifactsInfo.dateSaved);
        //   await this.getModelInfo();
        //   console.log(this.modelLastUpdated);
        //   if (!this.modelLastUpdated  || dateSaved >= new Date(this.modelLastUpdated).getTime()) {
        //     console.log('Using saved model');
        //   }
        //   else {
        //     this.setState({
        //       modelUpdateAvailable: true,
        //       showModelUpdateAlert: true,
        //     });
        //   }

        // }
        // catch (error) {
        //   console.warn(error);
        //   console.warn('Could not retrieve when model was saved.');
        // }

      }
      // If error here, assume that the object store doesn't exist and the model currently isn't
      // saved in IndexedDB.https://raw.githubusercontent.com/hsiangling0/tableware_detector/main/models/tableware_detector/model.json
      catch (error) {
        console.log('Not found in IndexedDB. Loading and saving...');
        console.log(error);
        model = await loadGraphModel("https://raw.githubusercontent.com/hsiangling0/tableware_detector/main/models/tableware_detector/model.json");
        await model.save('indexeddb://' + INDEXEDDB_KEY);
      }                               
    }
    // If no IndexedDB, then just download like normal.
    else {
      console.warn('IndexedDB not supported.');
      model = await loadGraphModel("http://127.0.0.1:8080/model.json");
    }

    // this.setState({ modelLoaded: true });

    // const model = await loadGraphModel("http://127.0.0.1:8080/model.json");
    // const model = await loadGraphModel("https://github.com/hsiangling0/object_detector_app/blob/main/models/tableware_detector/model.json");
    // console.log(model.outputNodes);
    return model
  }
let classesDir = {
  1: {
    name: 'friendly_chopsticks',
    id: 1,
  },
  2: {
    name: 'unfriendly_chopsticks',
    id: 2,
  },
  3: {
    name: 'friendly_spoon',
    id: 3,
  },
  4: {
    name: 'unfriendly_spoon',
    id: 4,
  },
  5: {
    name: 'friendly_bottle',
    id: 5,
  },
  6: {
    name: 'unfriendly_bottle',
    id: 6,
  },
  7: {
    name: 'friendly_drinkingstraw',
    id: 7,
  },
  8: {
    name: 'unfriendly_drinkingstraw',
    id: 8,
  },
  9: {
    name: 'friendly_fork',
    id: 9,
  },
  10: {
    name: 'unfriendly_fork',
    id: 10,
  }
}

export default class identify extends React.Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();
  photoRef=React.createRef();
  constructor(props){
    super(props);
    this.shutdown=false;
    this.state={
      button:false,
      friendly:0,
      unfriendly:0,
    }
    this.setButton=this.setButton.bind(this)
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
            facingMode: "user"
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
        if(this.shutdown){
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

  buildDetectedObjects(scores, threshold, boxes, classes, classesDir) {
    const detectionObjects = []
    var video_frame = document.getElementById('frame');

    scores[0].forEach((score, i) => {
      if (score > threshold) {
        const bbox = [];
        const minY = boxes[0][i][0] * video_frame.offsetHeight;
        const minX = boxes[0][i][1] * video_frame.offsetWidth;
        const maxY = boxes[0][i][2] * video_frame.offsetHeight;
        const maxX = boxes[0][i][3] * video_frame.offsetWidth;
        bbox[0] = minX;
        bbox[1] = minY;
        bbox[2] = maxX - minX;
        bbox[3] = maxY - minY;
        detectionObjects.push({
          class: classes[i],
          label: classesDir[classes[i]].name,
          score: score.toFixed(4),
          bbox: bbox
        })
      }
    })
    return detectionObjects
  }

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
    const detections = this.buildDetectedObjects(scores, threshold,
      boxes, classes, classesDir);

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
  setButton(value){
    this.setState({ button: value });
    this.shutdown=value;
  }
  render() {
    return (
      <div>
        <div className="title">
          <h3>Detection</h3>
        </div>
        <div className="choice">
          <a className="realtime">real-time</a>
          <a className="upload">upload</a>
        </div>
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
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
