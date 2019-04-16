// Set up ADAL
var authContext = new AuthenticationContext({
    clientId: "dec268a7-45b7-4ed2-ba93-ba6675b34911",
    popUp: true,
    callback : authenticateApp
});

function getSubscriptions(access_token) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://management.azure.com/subscriptions?api-version=2016-06-01', true);
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

            if (xhr.status === 200) {
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

function createWebsite() {
//PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}?api-version=2016-08-01
}

function createApp(access_token) {
    var subscriptionId;

    getSubscriptions(access_token)
        .then((response) => {
            document.getElementById('api_response').innerHTML = response.value.map((sub) => `<div>${sub.subscriptionId}</div>`).join("");
            
            subscriptionId = response.value[0].subscriptionId;
            return subscriptionId;
        })
        .then((subscriptionId) => createResourceGroup(access_token, subscriptionId, 'codeLikeAKidResourceGroup'))
        .then((response) => {
            document.getElementById('api_response').innerHTML = response.name;

            return response.name;
        })
        .then((resourceGroupName) => createHostingPlan(access_token, subscriptionId, resourceGroupName, 'codeLikeAKidHosting'))
        .then((response) => console.log(response))
        .catch((response) => {
            document.getElementById('api_response').textContent = response;
        })
}

function authenticateApp(errorDesc, token, error, tokenType) { 
    // Get an access token to the Azure Resource Manager API
    authContext.acquireToken(
        'https://management.azure.com/',
        function (error, token) {
            if (error || !token) {
                // TODO: Handle error obtaining access token
                console.log(error);

                authContext.acquireTokenPopup('https://management.azure.com/', null, null,  function (errorDesc, token, error) {
                    createApp(token);
                });
            }
            else {
                // Use the access token
                createApp(token);
            }
        }
    );
}