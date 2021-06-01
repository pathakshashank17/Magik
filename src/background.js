import 'babel-polyfill';
import {load} from '@teachablemachine/image';
import {
  CAM_ACCESS,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  METADATA_EXT,
  MODEL_EXT,
  PAGE_LOADED,
  PREDICTION,
  MODEL_URL,
  FIRST_TIME,
} from './constants';

let model;
let video = document.createElement('video');
let canvas = document.createElement('canvas');
let doLoop = false;

// Check if camera access already exists
chrome.storage.sync.get(CAM_ACCESS, async (items) => {
  if (!!items[CAM_ACCESS]) {
    console.log('Camera access already exists');
    await loadModel();
  }
});

// Add a change event listener to CAM_ACCESS
chrome.storage.onChanged.addListener(async (changes) => {
  if (CAM_ACCESS in changes) {
    console.log('Camera access is granted');
    await loadModel();
  }
});

// First-time setup to gain webcam access
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason.search(/install/g) === -1) {
    return;
  }
  chrome.tabs.create({
    url: chrome.extension.getURL(FIRST_TIME),
    active: true,
  });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message && message.message === PAGE_LOADED) {
    doLoop = true;
    setupCam();
  } else {
    doLoop = false;
    destroyCam();
  }
});

let setupCam = async () => {
  let mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  try {
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.srcObject = mediaStream;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    console.log('src assigned');
  } catch (err) {
    console.log(err);
  }
  if (doLoop) {
    setTimeout(async () => await loop(), 1000);
  }
};

let loop = async () => {
  const prediction = await predict(video);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (!tabs.length)
      return;
    chrome.tabs.sendMessage(
        tabs[0].id,
        {action: PREDICTION, prediction},
    );
  });
  if (doLoop)
    setTimeout(async () => await loop(), 250);
};

let destroyCam = async () => {
  video.srcObject.getTracks().forEach(function(track) {
    track.stop();
  });
};

let loadModel = async () => {
  console.log('Loading model...');
  const modelURL = MODEL_URL + MODEL_EXT;
  const metadataURL = MODEL_URL + METADATA_EXT;
  try {
    model = await load(modelURL, metadataURL);
    let maxPredictions = model.getTotalClasses();
    console.log(`Max predictions:${maxPredictions}`);
  } catch (err) {
    console.error(`Unable to load model from URL: ${MODEL_URL}: ${err}`);
  }
};

let predict = async () => {
  console.log('Predicting...');
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  return await model.predict(canvas);
};