import { figures } from './figures.js';
import { boardMatrix } from './board.js';
import { draw } from "./draw.js";
import {drawGameOver} from "./drawGameOver.js";
import {clickStart} from "./mainLogic.js";
import {clickPause} from "./mainLogic.js";

document.getElementById('start-button').onclick = clickStart;
document.getElementById('pause-button').onclick = clickPause;
document.getElementById('pause-button').style.visibility = "hidden";
// document.getElementById("pause-button").disabled = true;