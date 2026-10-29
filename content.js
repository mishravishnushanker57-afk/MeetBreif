let isCapturing = false;
let transcript = [];
let observer = null;

const captionSelectors = [
  '[role="region"] [role="listitem"]',
  '[aria-live="polite"]'
];

function saveTranscript() {
  chrome.storage.local.set({
    meetbriefTranscript: transcript
  });
}

function readCaptions() {
  if (!isCapturing) return;

  const elements = document.querySelectorAll(
    captionSelectors.join(",")
  );

  for (const element of elements) {
    const text = element.innerText?.trim();

    if (!text || text.length < 2) continue;

    if (!transcript.includes(text)) {
      transcript.push(text);
      saveTranscript();
      console.log("MeetBrief caption:", text);
    }
  }
}

function startCapture() {
  isCapturing = true;

  chrome.storage.local.get("meetbriefTranscript", data => {
    transcript = data.meetbriefTranscript || [];
    readCaptions();

    if (!observer) {
      observer = new MutationObserver(readCaptions);

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
  });
}

function stopCapture() {
  isCapturing = false;
  saveTranscript();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "START_CAPTURE") {
    startCapture();
    sendResponse({ success: true });
  }

  if (message.action === "STOP_CAPTURE") {
    stopCapture();
    sendResponse({ success: true });
  }
});

console.log("MeetBrief content script loaded.");