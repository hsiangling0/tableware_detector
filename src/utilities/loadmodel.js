import { loadGraphModel } from '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
const INDEXEDDB_KEY = 'web-model';
export async function load_model() {
    var model='';
      if (('indexedDB' in window)) {
        try {
          model = await loadGraphModel('indexeddb://' + INDEXEDDB_KEY);
  
        }
        catch (error) {
          model = await loadGraphModel("https://raw.githubusercontent.com/hsiangling0/tableware_detector/main/models/tableware_detector/model.json");
          await model.save('indexeddb://' + INDEXEDDB_KEY);
          console.log('Not found in IndexedDB. Loading and saving...');
          console.log(error);
        }                               
      }
      // If no IndexedDB, then just download like normal.
      else {
        console.warn('IndexedDB not supported.');
        model = await loadGraphModel("http://127.0.0.1:8080/model.json");
      }
      return model
    }