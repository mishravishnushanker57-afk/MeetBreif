const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const summarizeButton = document.getElementById("summarize");
const statusText = document.getElementById("status");
const settingsButton = document.getElementById("settings");

async function getMeetTab() {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  const tab = tabs[0];

  if (!tab || !tab.url?.startsWith("https://meet.google.com/")) {
    throw new Error("Please open a Google Meet tab first.");
  }

  return tab;
}

startButton.addEventListener("click", async () => {
  try {
    const tab = await getMeetTab();

    chrome.tabs.sendMessage(tab.id, {
      action: "START_CAPTURE"
    }, () => {
      if (chrome.runtime.lastError) {
        statusText.textContent = "Reload Google Meet and try again.";
        return;
      }

      statusText.textContent = "Caption capture started.";
    });
  } catch (error) {
    statusText.textContent = error.message;
  }
});

stopButton.addEventListener("click", async () => {
  try {
    const tab = await getMeetTab();

    chrome.tabs.sendMessage(tab.id, {
      action: "STOP_CAPTURE"
    }, () => {
      if (chrome.runtime.lastError) {
        statusText.textContent = "Reload Google Meet and try again.";
        return;
      }

      statusText.textContent = "Caption capture stopped.";
    });
  } catch (error) {
    statusText.textContent = error.message;
  }
});

summarizeButton.addEventListener("click", async () => {
  try {
    statusText.textContent = "Generating notes...";

    const data = await chrome.storage.local.get([
      "meetbriefTranscript",
      "geminiApiKey"
    ]);

    const transcript = data.meetbriefTranscript || [];

    if (transcript.length === 0) {
      throw new Error("No captions saved yet. Start capture first.");
    }

    if (!data.geminiApiKey) {
      throw new Error("Add your Gemini API key in settings first.");
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": data.geminiApiKey
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Create concise meeting notes using only this transcript.
Include:
1. Summary
2. Key discussion points
3. Decisions made
4. Action items and owners, if stated

Do not invent missing information.

Transcript:
${transcript.join("\n")}`
            }]
          }]
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error?.message || "Gemini API request failed."
      );
    }

    const notes = result.candidates?.[0]?.content?.parts
      ?.map(part => part.text || "")
      .join("\n");

    if (!notes) {
      throw new Error("Gemini returned no notes.");
    }

    await chrome.storage.local.set({ meetbriefNotes: notes });

    const blob = new Blob([notes], {
      type: "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "MeetBrief-Notes.txt";
    link.click();

    URL.revokeObjectURL(url);

    statusText.textContent = "Notes generated and downloaded!";
  } catch (error) {
    statusText.textContent = error.message;
  }
});

settingsButton.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});