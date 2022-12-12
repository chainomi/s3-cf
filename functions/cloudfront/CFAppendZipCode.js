function handler(event) {
    var request = event.request;
    var requestHeaders = request.headers;
    
    //- check to see if `zipcode` exists in the query string
    var responseQueryString = request.querystring;
    var queryStringKey = "zipcode";
    
    console.log(responseQueryString);
    if(queryStringKey in responseQueryString) {
        //- if it does return request
        return request;
    }

    var akamaiForwardedZipHeaderKey = "forwarded-viewer-zipcode";
    if(requestHeaders[akamaiForwardedZipHeaderKey]) {
        var zipCode = requestHeaders[akamaiForwardedZipHeaderKey];
        console.log(`zipCode: ${zipCode}`);
        var queryStringCollapsed = "";
        for(var queryKey in responseQueryString) { //this will make you miss es6+
            if(responseQueryString.hasOwnProperty(queryKey)) {
                queryStringCollapsed += `${queryKey}=`;
                var queryValueObject = responseQueryString[queryKey];
                for(var queryValueKey in queryValueObject) {
                    var queryValueObjectValue = queryValueObject[queryValueKey];
                    queryStringCollapsed += `${queryValueObjectValue}`;
                }
            }
        }
        
        var response = {
            statusCode: 302,
            statusDescription: "Found",
            headers: { 
                "location" : { 
                    value : `${request.uri}?${queryStringCollapsed}&zipcode=${zipCode.value}`
                } 
            }
        }
        
        return response;
    }
        
    return request;
}
