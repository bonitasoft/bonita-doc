# Cache busting
This page describes the mechanism used in Bonita to refresh the cache for users when a page created with the UI Designer is updated.

Cache busting has been introduced in Bonita 7.6, along with a new [cache policy](cache-configuration-and-policy.md).  
It allows end users to benefit from custom page update without the need to empty the browser cache.  
When you export a page or a layout from the UI Designer, we suffix the resource filename with a hash.  
If the page is updated, the resource filename will change, and the browser will download it from the server, and not from the cache.

If you do not use the UI Designer to edit and export your custom page, do not forget to manually trigger the cache busting mechanism.  
It means that, as a developer, you must make sure to either change the file names of the modified resources (javaScript, CSS, images, etc...)
 or add a query parameter (e.g. ?version=2) to the URLs used in the HTML to access those resources, so that the web-browser will not use the
 version it has in cache but the new file instead.  
Without this cache busting, end users will not benefit from the latest custom page changes, unless they empty their browser cache.
