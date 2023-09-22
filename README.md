# Copy Shopee Product URLs Extension for Google Chrome

The idea behind creating this extension is driven by my difficulty with one of my tasks at the workplace. My task entails gathering Shopee product URLs and inputting them into a Google Spreadsheet. The process involved opening each URL in a new tab and manually copying it into the spreadsheet, which proved to be time-consuming.

Actually there is already an extension  called "Copy All URLs" in the Chrome Web Store, it helps to copy all URLs from all open tabs, but the extension also copies unrelated URLs to Shopee products, thus requiring further manual separation in the spreadsheet. This process is also a little time consuming.
To address this, I created an extension that automatically copies only the Shopee product URLs from open tabs, even when other URLs are present.

The operation of this extension involves capturing all the URL listings in the currently open tab, then filtering these URLs based on the Shopee product URL pattern, and subsequently copying the filtered list of URLs to the clipboard

In this project, I used references from https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.offscreen-clipboard-write 

