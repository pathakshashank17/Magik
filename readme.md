<h1 align="center">Magik 🎩✨</h1>
<h3 align="center">A <a href="https://teachablemachine.withgoogle.com/">Teachable Machine</a> based Google Chrome extension</h3>

<p align="center">Teachable machine is an amazing tool developed by Google that makes basic ML accessible for everyone. Integrating it into a Chrome extension allows an almost hands-free usage of Google Meet (Workspace Edition)</p>

<h4>Whom this might help ? 🤔</h4>

- Giving presentations while standing far from controls.
- People with disabilities.
- People with reduced motor function.

<h4>Installation 🎉</h4>

- Install from <a href="">Chrome Web Store</a>
- Alternatively:
    - Clone/Download this repo
    - (Optional) Make changes in the source code, like adding your own Teachable Machine model.
    - If you have npm installed, run ```npm i``` to install all the packages.
    - Then run ```npm run build```.
    - In Chrome browser, open <a href="chrome://extensions/">chrome://extensions</a> and enable developer mode.
    - Click on ```Load unpacked```, then select the ```dist``` subdirectory of the ```Magik``` directory.
- After installation, a tab will open asking for camera access. Allow it and you are done 🎉.

<h4>Usage 🧙‍♂️</h4>

- Open Google Meet (Workspace Edition).
- Covering your mouth mutes the microphone.
- Covering your eyes turns off the camera.
- Guess what raising your hand does 🤔 ?

<h4>Note 🗒️</h4>
If you feel that the accuracy of the model is off by quite a bit, you can train your own
<a href="https://www.tensorflow.org/js">tensorflow.js</a> model from <a href="https://teachablemachine.withgoogle.com/">
Teachable Machine</a> and add that to the ```constants.js```. After that follow the alternative installation steps
mentioned above

<h4>Demo 👨‍💻</h4>
<img src="demos/gifAllThree" alt="demo gif">

<h4>Disabling/Removing</h4>
If you want to temporarily disable the extension, it is better suited to toggle off the extension
from <a href="chrome://extensions/">chrome://extensions</a>. For removing, simply click ```Remove``` in the extensions
tab.

<p align="center">All contributions and issues are welcome 🤗.</p>