/*
  Filename: popup.js
  Author: Abhigyan Saxena, Xiaoyi Lu, Evelyn Thomas, Achyut Paudel, Linh Nguyen
  Description: using popup.js for creating the backend 
  Date: 11-07-2020
  */

let resetStopwatch = document.getElementById("resetStopwatch");

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ time: 0 }, () => {
    resetStopwatch.textContent = toHHMMSS(0);
  });
});

chrome.storage.sync.get("time", (data) => {
  resetStopwatch.textContent = toHHMMSS(data.time);
});

resetStopwatch.onclick = () => {
  chrome.storage.sync.set({ time: 0 }, () => {
    resetStopwatch.textContent = toHHMMSS(0);
  });
};

const toHHMMSS = (sec_num) => {
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};
