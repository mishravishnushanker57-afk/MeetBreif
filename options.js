const apiKeyInput = document.getElementById("apiKey");
const saveButton = document.getElementById("save");
const statusText = document.getElementById("status");

chrome.storage.local.get("geminiApiKey", data => {
  apiKeyInput.value = data.geminiApiKey || "";
});

saveButton.addEventListener("click", async () => {
  const apiKey = apiKeyInput.value.trim();

  if (!apiKey) {
    statusText.textContent = "Please enter an API key.";
    return;
  }

  await chrome.storage.local.set({
    geminiApiKey: apiKey
  });

  statusText.textContent = "API key saved locally.";
});