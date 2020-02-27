# Google Tag Manager guidelines

These guidelines are a must read for [Google Tag Manager (GTM)](https://www.google.com/analytics/tag-manager) users and they should fully understood before actually using the tool.
While marketed and understood by marketers as a simple WYSIWYG tracking editor tool anyone can use, GTM is a very powerful and flexible tool which gives its users unrestricted access to the entire website, its data and functionality. With great power comes great responsibility and these guidelines help you navigate the jungle called Google Tag Manager.

**Table of Contents**

* [Access management](#access-management)
	* [Email addresses](#email-addresses)
	* [Access rights](#access-rights)
	* [Two-step login verification](#two-step-login-verification)
* [Workflow](#workflow)
	* [Workspaces](#workspaces)
	* [Version names and description/notes](#version-names-and-descriptionnotes)
	* [Folders](#folders)
* [Naming convention](#naming-convention)
	* [Tags](#tags)
	* [Triggers](#triggers)
	* [Variables](#variables)
*  [Technical guidelines](#technical-guidelines)
	* [Use constants for all settings](#use-constants-for-all-settings)
	* [Activate only the built-in variables you need](#activate-only-the-built-in-variables-you-need)
	* [JavaScript](#javascript)
		* [Isolate custom JavaScript in tags](#isolate-custom-javascript-in-tags)
		* [Use variables to reuse code](#use-variables-to-reuse-code)
		* [Adhere to the browser support guideline of your website](#adhere-to-the-browser-support-guideline-of-your-website)
		* [Use built-in solutions if possible and only use Custom JS as fallback](#use-built-in-solutions-if-possible-and-only-use-custom-js-as-fallback)
		* [Document your functions](#document-your-functions)
		* [Do not use console.log in production](#do-not-use-console.log-in-production)
	* [Security](#security)
		* [Use Subresource Integrity](#use-subresource-integrity)
		* [Google Tag Manager guidelines - Ask for help](#ask-for-help)
	* [data layer](#data-layer)
		* [Which data layer? CEDDL or Google?](#which-data-layer-ceddl-or-google)
		* [Do not use tool-specific data layer naming and structure](#do-not-use-tool-specific-data-layer-naming-and-structure)
		* [Do not push Personally Identifiable Information (PII) to the data layer](#do-not-push-personally-identifiable-information-pii-to-the-data-layer)
		* [Avoid adding data to the data layer from Google Tag Manager itself](#avoid-adding-data-to-the-data-layer-from-google-tag-manager-itself)
	* [Triggers](#triggers)
* [Testing](#testing)
  * [Avoid a page reload when testing](#avoid-a-page-reload-when-testing)

- - - -

## Access management

### Email addresses

Only provide access to containers to individuals using their company email address. If they don’t have a Google Account with their company email address, they can easily create one. On the [signup page](https://accounts.google.com/signup) they can choose to use an existing email address instead of creating a @gmail.com address.
In case this is not possible for a reason, make sure that you only provide access to users with clear email addresses. To make sure that you know who is behind the email address.

```js
//Good
🟢 john.doe@company.com

//To be avoided but acceptable
🟠 john.doe@gmail.com

//Bad – Do not provide access
⛔️ lollipop@gmail.com
```

### Access rights

⚠️ When providing somebody with access to Google Tag Manager, follow these rules when assigning access rights:

1. _Read_: safe to provide to anybody who needs access to the container
2. _Edit_: only give this to people who really needs to edit the container
3. _Approve_: only give this to people who are technically capable of editing and reviewing the items inside Google Tag Manager
4. _Publish_: only give this to as few people as possible. Everyone who doesn’t _absolutely_ need it should have a lower access level!

✅ Do quarterly checks if users can be moved to a more restrictive acces level or removed entirely.

### Two-step login verification

2-step login verification should be required on every Google Tag Manager account. Enabling this forces users to enable two-step authentication on their Google account before they can publish a container version, edit custom HTML or JavaScript tags and variables.


## Workflow

### Workspaces

The `Default workspace` should be kept empty for emergencies. If there ever is a need for a bug fix, you haven’t to:
1. go through workspaces with existing changes because you have to figure out what they do before publishing your bug fix
2. sacrifice changes that already have been made just because there aren’t empty workspaces left

⚠️ Use one workspace per implementation, do not solve different problems in one workspace.

### Version names and description/notes

Name every version. The changes of the version should be intuitively clear from just the name. Focus on the _business impact_ of the change rather than the technical details. If a ticket or task system is used to initiate the change, include a reference to the ticket or task in the version name.

Write a version description/notes for every version. The description should answer:
* Who requested the change?
* What was the tracking behaviour before this change, what’s it like now?
* Were there website changes that this GTM implementation depends on? If so, what are they?

Example of a version description/notes:

```markdown
## Requested by
John Doe (Company Inc.)

## Reason for this change
Phone number tracking doesn’t work on Safari.

## Changes in this version
Phone number tracking is fixed.
A function was being used that was not supported by Safari.

## Related website changes
No website changes were related to this change / bugfix.
```

### Folders

Use folders to group your tags, triggers and variables by the goal they’re achieving. Some examples:

| Type		 							| Description			 																									|
| :--			 							| :--							 																									|
| Facebook 							| Facebook related items 																						|
| Cross Domain Tracking | Utilities related to Cross Domain Tracking 												|
| Utilities 						| Helper functions and scripts that are used for different purposes |


## Naming convention

### Tags

Use this naming convention for tags: `tag_type_abbreviation - name`

* `tag_type_abbreviation` refers to the different kind of Google Tag Manager tags. For the ones listed below you can use an abbreviation. For other you can just copy the whole type of the tag. E.g. `Google Optimize`
* `name` is a descriptive name for this tag. Keep it short but in combination with `type` it should be immediately understandable what it refers to. If there is no need to add a name, you can leave this away. E.g. if you have only one Google Optimize tag, you can just name it like this: `Google Optimize`

| Tag type 			| tag_type_abbreviation 					|
| :-- 					| :-- 														|
| CL 						| Conversion Linker 							|
| UA - E 				| Universal Analytics - Event 		|
| UA - PV 			| Universal Analytics - Page View |
| UA - S 				| Universal Analytics - Social 		|

### Triggers

Use this naming convention for triggers: `type name`

* `type` refers to the different kind of Google Tag Manager triggers.  The most important ones are listed in the below table.
* `name` is a descriptive name for this trigger. Keep it short but in combination with `type` it should be immediately understandable what it refers to.

| Type		 	| Description			 																																					|
| :-- 			| :-- 																																											|
| Click 		| A click on a page 																																				|
| PV 				| A page view 																																							|
| Event 		| Any custom GTM event that does not match one of the types listed above 										|
| State 		| A certain state of your website and is usually used as an exception rather than a trigger |

### Variables

Use this naming convention for variables: `variable_type_abbreviation.[tool.]name`

* `variable_type_abbreviation` refers to the different kind of Google Tag Manager variables. Since a variable’s type is not immediately visible when looking at a reference like `{{myVariable}}`, it’s hard to identify where the data is coming from.
* `tool` is an optional part for variables which are (and will be) only relevant to one tool. A `tool` in this case can be either a product like `adform`, `hotjar`, `kissmetrics` or a universal concept like Google Analytics Enhanced Ecommerce which has the common abbreviation `eec`.
* `name` is a descriptive name for this variable. Keep it short but in combination with `type` and `tool` it should be immediately understandable what it refers to.

| Variable type							| variable_type_abbreviation	|
| :-- 											| :-- 												|
| Auto-Event Variable 			| aev 												|
| Constant 									| c 													|
| Custom JavaScript 				| cjs 												|
| Data Layer Variable 			| dlv 												|
| DOM Element 							| dom 												|
| Google Analytics settings | gas													|
| JavaScript Variable 			| jsvar 											|
| Lookup Table 							| lookup 											|

#### Some examples

* A Pinterest Tag ID: `c.pinterest.tagId`
* A Custom JavaScript script which determines whether a clicked link is an internal or extranet link: `cjs.link is internal` – this variable returns `true` or `false`


## Technical guidelines

### Use constants for all settings

As soon as more than one tag uses the same configuration value (e.g.: a tracking property ID), create a `Constant` variable and refer to it from the tag.

### Activate only the built-in variables you need

Activate only the built-in variables you actively use. This helps to maintain a clean container. If you’re not sure whether a built-in variable is used or not, just try to disable it. When it’s in use, you will get a notice.

### JavaScript

JavaScript in Google Tag Manager can interfere with your website’s JavaScript in unintended and unexpected ways. To make sure that GTM implementations have as little impact on smooth operation of your site, follow these basic guidelines:

#### Isolate custom JavaScript in tags

If you use custom JavaScript in tags you should prevent that variables do not leak into the [global scope](https://developer.mozilla.org/en-US/docs/Glossary/global_scope). Limit the scope of your implementation by wrapping your code in an anonymous function:

```js
// 🟢 best practice
;(function() {
    var foo = “bar”
})()

// ⛔️ to be avoided
var foo = “bar”
```

If you need to persist a variable for the duration of the pageview or you need to access the same variable from multiple tag executions, use a dataLayer variable.

```js
// Push the variable to the dataLayer
;(function() {
    dataLayer.push({
        foo: ‘bar’,
    })
})()

// Create a dataLayer variable and access it like this
console.log({{dl.foo}})
```


#### Use variables to reuse code

Create a variable of the type _Custom JavaScript_:

```js
// Custom JavaScript variable: js.myVar
function () {
    //JS logic goes in here
}
```

You can then use `{{js.myVar}}` as a variable in other JavaScript based GTM tags and variables:

#### Adhere to the browser support guideline of your website

Know which browsers your website / company officially supports. Unfortunately there are still plenty of JavaScript features that semi-popular browsers do not support. Implementing these anyway without fallbacks or programmatically checking for browser support beforehand can break your tracking or even website functionality itself.
You can use [Can I use](https://caniuse.com/) or [MDN Web Docs](https://developer.mozilla.org/) to verify browser support.

#### Use built-in solutions if possible and only use Custom JS as fallback

Custom JavaScript is more prone to errors than the solutions that Google Tag Manager supports out of the box. Use built-in tag templates instead of JavaScript where you can.

1. Verify if there’s a GTM-native tag template
2. Use Lookup Tables instead of `if … else …` constructs

#### Document your functions

If you write your own functions, document them [using JSDoc syntax](http://usejsdoc.org/about-getting-started.html).

```js
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {

}
```


#### Do not use console.log in production

Make sure to remove `console.log` once you publish your workspace to production. It needlessly clutters the  browser console.
You can use it off-course for debugging purposes during development and testing.

### Security

#### Use Subresource Integrity

Avoid the use of 3rd party scripts. But in case you have to include them, make sure to use use [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to make sure the integrated resource does not change without you noticing.
Useful tool to generate hashes: [SRI Hash Generator](https://www.srihash.org/)

#### Ask for help

⁉️ If you’re not _entirely_ confident with what you’re doing, consult somebody else to assist you.

#### Use a development property for testing purposes

Make sure to use development properties in Google Analytics whenever you are testing your code. This avoids polluting production data.

### data layer

#### Which data layer? CEDDL or Google?

Depending on the purpose, we store our data in the [CEDDL data layer](https://www.w3.org/2013/12/ceddl-201312) `digitalData` or the [Google data layer](https://developers.google.com/tag-manager/devguide) `dataLayer`.

Although we cannot give an exact indication of which data needs to be stored in which data layer, the general rule is this:
* Static data should be stored in the CEDDL data layer. Some examples:
	* User data (IP, segment, …)
	* Page data (language, components, categorisation, …)
* Event data should be stored in the Google data layer. Some examples:
	* E-commerce data (add to cart, purchase, …)
	* Page scrolling

The reason for this is that the CEDDL data layer has clear guidelines and predefined structure on how to store the data. The Google data layer on the other hand, is very useful to handle events which do not persist over multiple pages.

#### Do not use tool-specific data layer naming and structure

Make sure the names of data layer variables are always as descriptive as possible.
Do not use tool specific keys, even if it may seem convenient. Separating tool logic from the website is one of the most important goals of using Google Tag Manager.

Console:
```js
// 🟢 good
> digitalData.page.attributes.language
< “en”

// ⛔️ bad
> dataLayer.dimension12
< “0A”
```

Use Custom JavaScript variables to preprocess data for individual tools if necessary.

#### Do not push Personally Identifiable Information (PII) to the data layer

Information that can be used by third parties to identify a person or a device should not be used in dataLayer.
That includes names, phone numbers, email addresses and IP addresses.

It’s okay to submit a proprietary user ID if only you can trace it back to an individual. But as this might be a grey zone, it might be good to consult a loyer or privacy expert.

#### Avoid adding data to the data layer from Google Tag Manager itself

In most cases it’s not a good idea to push data to the data layer in Custom HTML/JS code inside Google Tag Manager as it can be confusing when events come from both outside and inside Google Tag Manager.

If required, use the built-in [Tag Sequencing](https://support.google.com/tagmanager/answer/6238868?hl=en) capabilities when you have to deal with race conditions (situation where you require things to be processed in a certain order but you can’t guarantee that order) or certain dependencies.

### Triggers

In order to make sure that your tags fire at the right moment and to optimize page load time, it's very important that you have a good understanding of how triggers work.

1. Fire a tag only on pages where they need to fire. For example: if you're measuring a contact form which is on the contact page, only fire the measurment tag on the contact page instead of on all pages
2. Determine on which moment your tag should fire. In case you're firing tags on a certain page, make sure you understand the following three concepts:
	1. **Page View**: Fires immediately when the web browser begins to load a page. Use this option if you only need data generated from page impressions.
	2. **DOM Ready**: Fires after the browser has finished constructing the full page in HTML and the Document Object Model (DOM) is ready to be parsed. Pageview-based tags that interact with the DOM to populate variables should use this trigger type to ensure that the correct values are available to Tag Manager.
	3. **Window Loaded**: Fires after the page has fully loaded, including any embedded resources such as images and scripts.


## Testing

Below you'll find some tips you can use when testing your setup.

## Avoid a page reload when testing

Sometimes you need to debug on a page which redirects to another page before you have the ability to see the test results in your Google Tag Manager debug console. Add this JavaScript to your console on the page you want to prevent the page reload, and you will get a dialog before the page reloads which allows you to cancel the reload.

```js
window.addEventListener('beforeunload', function(e) {
  e.preventDefault();
  e.returnValue = '';
});
```
