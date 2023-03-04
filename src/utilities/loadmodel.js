import { loadGraphModel } from '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
const INDEXEDDB_KEY = 'web-model';
export async function load_model() {
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