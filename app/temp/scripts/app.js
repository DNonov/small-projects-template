/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var video = document.querySelector('.video')[0];
console.log(video);

var screenButton = document.getElementById('screen-button');
var pauseScreen = document.getElementById('screen');

var pbar = document.getElementById('pbar');
var pbarContainer = document.getElementById('pbar-container');
var playButton = document.getElementById('play-button');
var timeField = document.getElementById('time-field');
var soundButton = document.getElementById('sound-button');
var sbarContainer = document.getElementById('sbar-container');
var sbar = document.getElementById('sbar');
var fullscreenButton = document.getElementById('fullscreen-button');
window.addEventListener('load', function () {

  video.load();
  video.addEventListener('canplay', function () {
    playButton.addEventListener('click', playOrPause, false);
    pbarContainer.addEventListener('click', skip, false);
    soundButton.addEventListener('click', muteOrUnmute, false);
    sbarContainer.addEventListener('click', changeVolume, false);
    fullscreenButton.addEventListener('click', fullscreen, false);
    screenButton.addEventListener('click', playOrPause, false);
    updatePlayer();
  }, false);
}, false);

var filePathString = {
  play: 'assets/images/play.png',
  pause: 'assets/images/pause.png',
  replay: 'assets/images/replay.png',
  mute: 'assets/images/mute.png',
  sound: 'assets/images/sound.png'
};

function playOrPause() {
  if (video.paused) {
    video.play();
    playButton.src = filePathString.pause;
    update = setInterval(updatePlayer, 30);
    pauseScreen.style.display = 'none';
    screenButton.src = filePathString.play;
  } else {
    video.pause();
    playButton.src = filePathString.play;
    window.clearInterval(update);
    pauseScreen.style.display = 'block';
    screenButton.src = filePathString.play;
  }
}

function updatePlayer() {
  var precantage = video.currentTime / video.duration * 100;
  pbar.style.width = precantage + '%';
  timeField.innerHTML = getFormattedTime();
  if (video.ended) {
    window.clearInterval(update, 30);
    playButton.src = filePathString.replay;
    pauseScreen.style.display = 'block';
    screenButton.src = filePathString.replay;
  } else if (video.paused) {
    playButton.src = filePathString.play;
    screenButton.src = filePathString.play;
  }
}

function skip(ev) {
  var mouseX = ev.pageX - pbarContainer.offsetLeft;
  var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');
  width = parseFloat(width.substr(0, width.length - 2));
  video.currentTime = mouseX / width * video.duration;
  updatePlayer();
}

function getFormattedTime() {
  var seconds = Math.round(video.currentTime);
  var minutes = Math.floor(seconds / 60);
  if (minutes > 0) seconds = -minutes * 60;
  if (seconds.toString().length === 1) seconds = '0' + seconds;
  var totalSeconds = Math.round(video.duration);
  var totalMinutes = Math.floor(totalSeconds / 60);
  if (totalMinutes > 0) totalSeconds = -totalMinutes * 60;
  if (totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;
  return minutes + ':' + seconds + '/' + totalMinutes + ':' + totalSeconds;
}

function muteOrUnmute() {
  if (!video.muted) {
    video.muted = true;
    soundButton.src = filePathString.mute;
    sbar.style.display = 'none';
  } else {
    video.muted = false;
    soundButton.src = filePathString.sound;
    sbar.style.display = 'block';
  }
}

function changeVolume(ev) {
  var mouseX = ev.pageX - sbarContainer.offsetLeft;
  var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');
  width = parseFloat(width.substr(0, width.length - 2));
  video.volume = mouseX / width;
  sbar.style.width = mouseX / width * 100 + '%';
  video.muted = false;
  soundButton.src = filePathString.mute;
  sbar.style.display = 'block';
}

function fullscreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.mozRequestFullscreen) {
    video.mozRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
}

/***/ })
/******/ ]);