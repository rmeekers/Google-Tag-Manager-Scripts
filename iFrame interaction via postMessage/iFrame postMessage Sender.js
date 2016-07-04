<script>
 /**
 * GTM iFrame interaction via postMessage.
 * This postMessage sender should be added inside the iFrame window.
 * @license MIT License
 * @author Rutger Meekers [rutger@meekers.eu]
 */

/**
 * Some variables
 */

// Set the hostname of the parent window
var parentHostname = (window.location != window.parent.location) ? document.referrer : document.location.href;

// Should correspond with a messageType the postMessage Listener can process
var messageType = 'pushEventToDatalayer';


/**
 * Functions
 */

/**
 * doPost sends the postMessage to the parent window
 * messageType should correspond with a type that the postMessage Listener can process
 * @param {string} messageType
 * @param {string} eventAction
 * @param {string} eventLabel
 * @param {string} eventCategory
 */
function doPost(messageType, eventAction, eventLabel, eventCategory) {
    // Configure the content of the message to fit your situation
    var message = {
        messageType: messageType,
        eventAction: eventAction,
        eventLabel: eventLabel,
        eventCategory: eventCategory
    };
    // post the message to the parent window
    window.parent.postMessage(message, parentHostname);
}
</script>