# MeetBrief 🎙️

**MeetBrief** is an open-source browser extension that helps you generate concise AI-powered meeting notes from Google Meet captions.

## ✨ Features

- 📋 Capture captions from Google Meet.
- 🤖 Generate meeting notes using the Gemini API.
- 📝 Summarize key discussion points and decisions.
- ✅ Extract action items and owners when mentioned.
- 📥 Download generated notes as a `.txt` file.
- 🔑 Use your own Gemini API key.

## 🛠️ Tech Stack

- HTML
- CSS
- JavaScript
- Chrome Extension Manifest V3
- Google Gemini API

## 🚀 Getting Started

### Prerequisites

- Google Chrome or Microsoft Edge
- A Google Gemini API key
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/MeetBrief.git
   ```

2. Open Chrome or Edge and navigate to:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`

3. Enable **Developer mode**.

4. Click **Load unpacked**.

5. Select the cloned `MeetBrief` project folder.

### Configuration

1. Open the MeetBrief extension.
2. Click **Set Gemini API Key**.
3. Enter your Gemini API key and save it.
4. Open a Google Meet meeting and enable captions.
5. Start caption capture using MeetBrief.
6. Stop capture when the meeting ends.
7. Click **Generate Notes** to download your meeting notes.

## 📂 Project Structure

```text
MeetBrief/
├── manifest.json   # Extension configuration
├── popup.html      # Extension popup interface
├── popup.js        # Capture controls and AI requests
├── content.js      # Reads Google Meet captions
├── options.html    # API key settings page
├── options.js      # Saves API key locally
├── style.css       # Extension styling
└── README.md       # Project documentation
```

## ⚠️ Current Limitations

- MeetBrief currently reads on-screen Google Meet captions, not raw speaker audio.
- Google Meet's page structure may change, affecting caption capture.
- Accurate notes depend on the captions captured and the Gemini API response.
- A valid Gemini API key and internet connection are required.

## 🔒 Privacy & Security

- The extension stores the API key and transcript in the browser's local extension storage.
- The transcript is sent to Google's Gemini API when generating notes.
- Never commit API keys, passwords, or other secrets to GitHub.
- Obtain participants' consent before capturing or processing meeting content.

## 🗺️ Future Improvements

- [ ] Improve caption detection and transcript accuracy.
- [ ] Identify speakers reliably.
- [ ] Add an in-extension notes viewer.
- [ ] Export notes as Markdown or PDF.
- [ ] Explore optional audio transcription.

## 🤝 Contributing

Contributions, bug reports, and feature suggestions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Submit a pull request.

## 📄 License

This project is open source. A license has not yet been selected. Add a `LICENSE` file before specifying redistribution terms.

---

**Built to make meetings easier to remember.**
