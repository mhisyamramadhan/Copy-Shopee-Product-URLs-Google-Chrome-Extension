/*
In this file, I followed all the instructions from https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/functional-samples/cookbook.offscreen-clipboard-write/offscreen.js.
You can see more details on that link for a more in-depth look at the code.
*/

chrome.runtime.onMessage.addListener(handleMessages);

async function handleMessages(message) {
    if (message.target !== 'offscreen-doc') {
      return;
    }
  
    switch (message.type) {
      case 'copy-data-to-clipboard':
        handleClipboardWrite(message.data);
        break;
      default:
        console.warn(`Unexpected message type received: '${message.type}'.`);
    }
  }

const textEl = document.querySelector('#text');

async function handleClipboardWrite(data) {
    try {
      if (typeof data !== 'string') {
        throw new TypeError(
          `Value provided must be a 'string', got '${typeof data}'.`
        );
      }

      textEl.value = data;
      textEl.select();
      document.execCommand('copy');
      await new Promise((resolve) => setTimeout(resolve, 500)); // Prevent conflicts when clicking the extension icon rapidly. I added it on myself
    } finally {
      window.close();
    }
  }
