<script>
/** GTM Print Listener
 * Listens for page print events and send them as an event to the dataLayer
 * @version 1.0
 * @license MIT License
 * @author Rutger Meekers [rutger@meekers.eu]
 */

(function() {
    var run;

    var printDialog = function() {
        // Make sure we only run once on a page
        if (!run) {
            run = true;
            // Send Print Event to GTM
            dataLayer.push({
                'event': 'trackEvent',
                'eventAction' : 'Initiate Print Dialog',
                'eventCategory' : 'Other Interactions'
            });
        }
    };

    // Track printing from browsers using the Webkit engine
    if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql) {
            if (!mql.matches) {
                printDialog();
            }
        });
    }
    // Fallback for Internet Explorer
    window.onafterprint = printDialog;

    // Track printing using Ctrl/Cmd+P.
    document.addEventListener('keydown', function(allBrowsers) {

        if (allBrowsers.keyCode == 80 && (allBrowsers.ctrlKey || allBrowsers.metaKey)) {

            // For Opera we must send the printDialog() function
            if (navigator.userAgent.match(/Opera|OPR\//)) {
                printDialog();
            }
        }
    }, false);

    /*
     * Comment this out to enable print tracking from a button
     * Replace .print-link-class with your class or id from the print button
     */
    /*
    document.querySelector('.print-link-class').click(function() {
        // For Opera we must send the printDialog() function
        if (navigator.userAgent.match(/Opera|OPR\//)) {
            printDialog();
        }
    });
    */

}());
</script>