import {MUTE, CAM_OFF, DOUBT, PAGE_LOADED, PAGE_UNLOADED} from './constants';

let actOnPrediction = (predictions) => {
  let maxProb = -1;
  let className;
  for (const prediction of predictions) {
    if (prediction.probability >= maxProb) {
      maxProb = prediction.probability;
      className = prediction.className;
    }
  }
  console.log(`prediction:${className}`);
  if (className === MUTE) {
    let elem = [...document.querySelectorAll('button')].filter((item) =>
        item.getAttribute('aria-label').toString().includes('microphone'),
    )[0];
    console.log(elem);
    if (elem && elem.getAttribute('aria-label').includes('off')) {
      elem.click();
    }
  } else if (className === CAM_OFF) {
    let elem = [...document.querySelectorAll('button')].filter((item) =>
        item.getAttribute('aria-label').toString().includes('camera'),
    )[0];
    if (elem && elem.getAttribute('aria-label').includes('off')) {
      elem.click();
    }
  } else if (className === DOUBT) {
    let elem = [...document.querySelectorAll('button')].filter((item) =>
        item.getAttribute('aria-label').toString().includes('hand'),
    )[0];
    console.log(elem);
    if (elem && elem.getAttribute('aria-pressed').includes('false')) {
      elem.click();
    }
  }
  return true;
};

chrome.runtime.onMessage.addListener((message) => {
  if (message && message.prediction) {
    actOnPrediction(message.prediction);
  }
});

window.onload = () => {
  chrome.runtime.sendMessage({message: PAGE_LOADED});
};

window.onunload = () => {
  chrome.runtime.sendMessage({message: PAGE_UNLOADED});
};
