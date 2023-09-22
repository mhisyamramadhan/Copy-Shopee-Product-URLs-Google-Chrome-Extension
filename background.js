/*
In this file, I followed some instructions, especially on `function addToClipboard(value)` from https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/functional-samples/cookbook.offscreen-clipboard-write/background.js
You can see more details on that link for a more in-depth look at the code.
*/

// Register an event handler for when the extension icon is clicked
chrome.action.onClicked.addListener(getShopeeOpenTabsURLs);

// Function to retrieve all URLs of tabs that match specific patterns
async function getShopeeOpenTabsURLs() {
  // URL patterns to be matched with tab URLs
  const urlPatterns = [
    /^https:\/\/shopee\.co\.id\/.*-i\.(\d+)\.(\d+)/,
    /^https:\/\/shopee\.co\.id\/product\/(\d+)\/(\d+)/,
    /^https:\/\/shopee\.co\.id\/xx-i\.(\d+)\.(\d+)/,
  ];

  // Using the chrome.tabs API to fetch the list of tabs in the current window
  chrome.tabs.query({currentWindow: true} , async function (tabs) {
    // Filter tabs whose URLs match any of the specified patterns
    const matchedUrls = tabs
      .filter(tab => urlPatterns.some(pattern => pattern.test(tab.url)))
      .map(tab => tab.url);
    
    // Join the matched URLs with newline characters
    const urlList = matchedUrls.join('\n');

    // Check if there are no matched URLs
    if (urlList.length === 0) {
      await addToClipboard('\n');
      noMatchedNotification();
    } else {
      const totalMatchedURLs = matchedUrls.length;
      await addToClipboard(urlList);
      showNotification(totalMatchedURLs);
    }
  });
}

// Function to add data to the clipboard
async function addToClipboard(value) {
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: [chrome.offscreen.Reason.CLIPBOARD],
      justification: 'Write text to the clipboard.'
    });
  
    chrome.runtime.sendMessage({
      type: 'copy-data-to-clipboard',
      target: 'offscreen-doc',
      data: value
    });
}

// Function to show a notification
async function showNotification(totalURL) {
    const notificationOptions = {
      type: 'basic',
      iconUrl: 'assets/icon48.png',
      title: 'Shopee product URLs copied!',
      message: `Total shopee product URLs: ${totalURL}`
    };
  
    chrome.notifications.create(notificationOptions);
};

// Function to show a notification when no matched URLs are found
async function noMatchedNotification() {
  const notificationOptions = {
    type: 'basic',
    iconUrl: 'assets/deniedicon48.png',
    title: 'No shopee product URL copied!',
    message: 'Please enter shopee product URL'
  };

  chrome.notifications.create(notificationOptions);
};


