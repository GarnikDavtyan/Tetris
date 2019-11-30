import {clickStart} from "./mainLogic.js";
import {clickPause} from "./mainLogic.js";

document.getElementById('start-button').onclick = clickStart;
document.getElementById('pause-button').onclick = clickPause;
document.getElementById('pause-button').style.visibility = "hidden";