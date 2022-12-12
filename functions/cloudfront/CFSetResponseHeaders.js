'use strict';

function handler(event) {
    var akamaiForwardedZipHeaderKey = "forwarded-viewer-zipcode";
    var response = event.response;
    var responseHeaders = response.headers;
    
    // this likely won't work because we can't set this header in the event.request stream
    /*
    console.log("forwarded-viewer-zipcode: " + responseHeaders[akamaiForwardedZipHeaderKey]);
    var akamaiHeaderExists = "false";
    
    if(responseHeaders[akamaiForwardedZipHeaderKey]) {
        akamaiHeaderExists = "true";
    }
    
    responseHeaders["x-zipcode"] = { value : akamaiHeaderExists };
    */
    responseHeaders["cache-control"] = { value: "public, max-age=1;" };
    
    // Return to CloudFront
    return response;
};
