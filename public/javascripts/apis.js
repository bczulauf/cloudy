function getResourceGroups(access_token, subscriptionId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://management.azure.com/subscriptions/${subscriptionId}/resourcegroups?api-version=2018-05-01`, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send();

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

function createResourceGroup(access_token, subscriptionId, resourceGroupName) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://management.azure.com/subscriptions/${subscriptionId}/resourcegroups/${resourceGroupName}?api-version=2018-05-01`, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({location: 'eastus'}));

    return new Promise(function(resolve, reject) {
        xhr.onreadystatechange = function () {
            // Only run if the request is complete.
            if (xhr.readyState !== 4) return;

            if (xhr.status === 200 || xhr.status === 201) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                // TODO: Do something with the error (or non-200 responses)
                reject('ERROR:\n\n' + xhr.responseText);
            }
        };
    });
}

function getToken(resourceURL) {
    const token = authContext.getCachedToken(resourceURL);

    return new Promise(function(resolve, reject) {
        if (token) {
            resolve(token);
        }

        authContext.acquireToken(resourceURL, function(error, token) {
            if (error) {
                authContext.acquireTokenPopup(resourceURL, null, null,  (errorDesc, token, error) => {
                    // Handle ADAL Error
                    if (error || !token) {
                        reject('ADAL Error Occurred: ' + error);
                    }

                    resolve(token);
                });
            } else {
                resolve(token);
            }
        });
    });
}

function getSubscriptions(access_token) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://management.azure.com/subscriptions?api-version=2016-06-01', true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send();

    return new Promise(function(resolve, reject) {
        xhr.onreadystatechange = function () {
            // Only run if the request is complete.
            if (xhr.readyState !== 4) return;

            if (xhr.status === 200 || xhr.status === 201) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                // TODO: Do something with the error (or non-200 responses)
                reject('ERROR:\n\n' + xhr.responseText);
            }
        };
    });
}

function createHostingPlan(access_token, subscriptionId, resourceGroupName, planName) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Web/serverfarms/${planName}?api-version=2016-09-01`, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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

function createDatabaseAccount(access_token, subscriptionId, resourceGroupName, accountName) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}?api-version=2015-04-08`, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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

function getDatabases(access_token, subscriptionId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.DocumentDB/databaseAccounts?api-version=2015-04-08`, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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