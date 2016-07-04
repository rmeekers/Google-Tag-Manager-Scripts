 <script>
 /** GTM iFrame interaction via postMessage 
 * postMessage Listener. To be added to the parent window
 * @license MIT License
 * @author Rutger Meekers [rutger@meekers.eu]
 */

// Add an eventListener which listens for postMessages
window.addEventListener('message', receiveMessage, false);

/**
 * This function receives the postMessages and processes them
 * @param {object} message
 */
function receiveMessage(message)  {
  var errors = [];
  switch (message.data.messageType) {

    // messageType equals pushEventoToDatalayer
    case 'pushEventToDatalayer':
      // We verify if all required fields are included in the postMessage
      // before we push an event to the dataLayer
      if (message.data.eventAction && message.data.eventLabel && message.data.eventCategory) {
        dataLayerPush(
          'trackEvent',
          message.data.eventAction,
          message.data.eventLabel,
          message.data.eventCategory
        );
      }
      else {
        if (!message.data.eventAction) {
          errors.push({'Error': 'Invalid eventAction (' + message.data.eventAction + ')'});
        }
        if (!message.data.eventLabel) {
          errors.push({'Error': 'Invalid eventLabel (' + message.data.eventLabel + ')'});
        }
        if (!message.data.eventCategory) {
          errors.push({'Error': 'Invalid eventCategory (' + message.data.eventCategory + ')'});
        }
        dataLayerPush('Error', 'postMessage incomplete', JSON.stringify(errors), 'postMessage');
      }
      break;

    // If there is something wrong with the postMessage,
    // we generate an error event
    default:
      dataLayerPush(
        'Error',
        'Invalid postMessage received',
        'Origin: ' + message.origin + ' - Data: ' + JSON.stringify(message.data),
        'postMessage'
      );
      break;

  }
}

/**
* Pushes an event to the dataLayer
* @param {string} event
* @param {string} action
* @param {string} label
* @param {string} category
*/
function dataLayerPush(event, action, label, category) {
  dataLayer.push({
    'event' : event,
    'eventAction' : action,
    'eventLabel' : label,
    'eventCategory' : category
  });
}

</script>
