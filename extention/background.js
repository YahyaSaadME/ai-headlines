chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: 'https://ai-headlines.vercel.app' });
  });
