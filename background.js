/*
  Filename: background.js
  Author: Abhigyan Saxena, Xiaoyi Lu, Evelyn Thomas, Achyut Paudel, Linh Nguyen
  Description: using background.js for creating the backend 
  Date: 11-07-2020
  */

const social_media = [
  "*://*.facebook.com/",
  "*://*.hulu.com/",
  "*://*.instagram.com/",
  "*://*.linkedin.com/",
  "*://*.netflix.com/",
  "*://*.reddit.com/",
  "*://*.twitter.com/",
  "*://*.youtube.com/",
];

var active = false;
var intervalId;

const setActiveTab = async () => {
  const activeTab = await getActiveTab();
  if (activeTab) {
    let host = new URL(activeTab.url).hostname;
    host = host.replace("www.", "").replace(".com", "");
    // if the active tab is social media, start the stopwatch
    if (social_media.some((each) => each.includes(host))) {
      if (!active) {
        start();
        // console.log("Clock works");
      }
    }
    // otherwise, stop the stopwatch
    else {
      if (active) {
        stop();
        // console.log("Clock does not work.");
      }
    }
  }
};

const getActiveTab = () => {
  return new Promise((resolve) => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (activeTab) => {
        resolve(activeTab[0]);
      }
    );
  });
};

const start = () => {
  active = true;
  intervalId = setInterval(() => {
    chrome.storage.sync.get("time", (data) => {
      chrome.storage.sync.set({ time: data.time + 1 });
    });
  }, 1000);
};

const stop = () => {
  active = false;
  clearInterval(intervalId);
};

// Fired when a tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  setActiveTab();
});

// Fires when the active tab in a window changes
chrome.tabs.onActivated.addListener((activeInfo) => {
  setActiveTab();
});

// Fired when the currently focused window changes
chrome.windows.onFocusChanged.addListener((windowId) => {
  // Returns chrome.windows.WINDOW_ID_NONE if all Chrome windows have lost focus
  if (windowId === chrome.windows.WINDOW_ID_NONE && active) {
    stop();
  } else {
    setActiveTab();
  }
});
