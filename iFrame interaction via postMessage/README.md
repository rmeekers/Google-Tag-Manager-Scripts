# GTM iFrame interaction via postMessage
This is a simple library which you can use to send messages / events from within an iFrame to the parent website on which that iFrame is included. The parent website processes those messages. At the moment it can only convert postMessages into a dataLayer event which you can use to send the data to Google Analytics for example. But you can use the library to extend this to whatever you want.

## Installation
### On the parent website
Create a Custom HTML tag in your Google Tag Manager container running on the parent website with the content of this file: _GTM - CHTML - postMessage  Listener.js_.

You can fire this at DOM Ready or add an additional filter so that it only fires when iFrames are available which require this functionality. Add a parameter to your iframe `postmessagesupport="yes"` and then filter them out in with a custom JavaScript variable which returns the number of iFrames with this parameter.

```js
function(){
  return document.querySelectorAll("iframe[postmessagesupport=yes]").length;
}
```

Finally add a trigger which verifies that the outcome of this variable does not equal 0.

Don't forget to add a Trigger which catches your event and sends it to Google Analytics.

### On the iFrame

1. Include the script _iFrame postMessage Sender.js_  in your iFrame.
2. Determine which events you want to track and trigger the following function with the parameters you want to include in your event:

```
// Example how to send a postMessage. Modify this with real values!
// Parameters: messageType, eventAction, eventLabel, eventCategory.
doPost('pushEventToDatalayer', 'Click', 'Button ID', 'Widgets');
```