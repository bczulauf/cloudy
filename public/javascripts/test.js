// Set up ADAL
var authContext = new AuthenticationContext({
    clientId: "dec268a7-45b7-4ed2-ba93-ba6675b34911",
    popUp: true,
    callback : authenticateApp
});

function AJAX(url, type, access_token) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(type, url, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                promise.resolve(JSON.parse(xhr.responseText));
            } else {
                // TODO: Do something with the error (or non-200 responses)
                document.getElementById('api_response').textContent =
                    'ERROR:\n\n' + xhr.responseText;
            }
        };
        xhr.send();
    });
}

// Make an AJAX request to the Microsoft Graph API and print the response as JSON.
var getCurrentUser = function (access_token) {
    document.getElementById('api_response').textContent = 'Calling API...';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://management.azure.com/subscriptions?api-version=2016-06-01', true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Do something with the response
            document.getElementById('api_response').textContent =
                JSON.stringify(JSON.parse(xhr.responseText), null, '  ');
        } else {
            // TODO: Do something with the error (or non-200 responses)
            document.getElementById('api_response').textContent =
                'ERROR:\n\n' + xhr.responseText;
        }
    };
    xhr.send();
}


// Make an AJAX request to the Microsoft Graph API and print the response as JSON.
// function getCurrentUser(access_token) {
//     document.getElementById('api_response').textContent = 'Calling API...';
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', 'https://management.azure.com/subscriptions?api-version=2016-06-01', true);
//     xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             // Do something with the response
//             document.getElementById('api_response').textContent =
//                 JSON.stringify(JSON.parse(xhr.responseText), null, '  ');
//         } else {
//             // TODO: Do something with the error (or non-200 responses)
//             document.getElementById('api_response').textContent =
//                 'ERROR:\n\n' + xhr.responseText;
//         }
//     };
//     xhr.send();
// }

function authenticateApp(errorDesc, token, error, tokenType) { 
    // Get an access token to the Microsoft Graph API
    authContext.acquireToken(
        'https://management.azure.com/',
        function (error, token) {
            if (error || !token) {
                // TODO: Handle error obtaining access token
                document.getElementById('api_response').textContent =
                    'ERROR:\n\n' + error;

                // Gets the user subscriptions.
                AJAX('https://management.azure.com/subscriptions?api-version=2016-06-01', 'GET', token).then((response) => {
                    // Do something with the response
                    document.getElementById('api_response').textContent = JSON.stringify(response, null, '  ');
                });
            }
        }
    );
}

function AJAX(url, type, access_token) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send(JSON.stringify({location: 'eastus'}));

    return new Promise(function(resolve, reject) {
        xhr.onreadystatechange = function () {
            // Only run if the request is complete.
            if (xhr.readyState !== 4) return;

            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                // TODO: Do something with the error (or non-200 responses)
                reject('ERROR:\n\n' + xhr.responseText);
            }
        };
    });
}

function createResourceGroup() {
//PUT https://management.azure.com/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}?api-version=2018-05-01
}

function createHostingPlan() {
//PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}?api-version=2016-09-01
}

function createWebsite() {
//PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}?api-version=2016-08-01

}

    // // Attempts to get token silently
    // authContext.acquireToken('https://management.azure.com/',
    //     function (error, token) {
    //         if (error || !token) {
    //             // If error, attemps to get token thru popup.
    //             authContext.acquireTokenPopup('https://management.azure.com/', null, null,  function (errorDesc, token, error) {
    //                 // Handle ADAL Error
    //                 if (error || !token) {
    //                     console.log('ADAL Error Occurred: ' + error);
    //                     return;
    //                 }

    //                 getApps(token);
    //             });
    //         }
    //         else {
    //             // Use the access token
    //             getApps(token);
    //         }
    //     }
    // );