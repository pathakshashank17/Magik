let checkCameraAccess = async () => {
  await navigator.mediaDevices.getUserMedia({video: true});
  try {
    document.querySelector(
        '#status').innerHTML = 'Webcam access granted. Close this tab & you\'re good to go!';
    chrome.storage.sync.set({camAccess: true});
  } catch (err) {
    document.querySelector(
        '#status').innerHTML = `Can't get webcam access: ${err}`;
  }
};

checkCameraAccess();