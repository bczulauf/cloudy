// Configures ADAL.
const authContext = new AuthenticationContext({
    clientId: '9f5a2669-7885-43d3-b16d-6f161070e490',
    resource: 'https://management.azure.com/',
    popUp: true,
    redirectUri: 'http://localhost:30662/adal.html',
    callback : loginCallback
});

const router = new Router(
    {
        home: new Layout (
            new HomePage(),
            new Footer()
        ),
        "projects/(.*)": new Layout (
            new Header(),
            new DatabasePage()
        ),
        projects: new Layout (
            new Header(),
            new ProjectsPage()
        )
    },
    document.getElementById('main')
);
router.listen();

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

function selectSubscription(response) {
    var subscriptionsElement = document.getElementById('main')
    var subscriptions = response && response.value;

    return new Promise(function(resolve, reject) {
        if (!subscriptions) {
            // Prompt user to add a subscription
            reject('User needs to create a subscription');
        } else if (subscriptions.length === 1) {
            // Load resource groups
            resolve(subscriptions[0]);
        } else {
            // Let user choose a subscription and then load resource groups
            document.getElementById('api_response').innerHTML = response.value.map((subscription) => `<input type="radio" name="subscription" id="${subscription.subscriptionId}" value="${subscription.subscriptionId}"><label for="${subscription.subscriptionId}">${subscription.subscriptionId}</label>`).join("");

            // TODO: set up listener for when user selects subscription
        }
    })
}

function getProjects(token) {
    getSubscriptions(token)
    .then((response) => selectSubscription(response))
    .then((subscription) => {
        document.getElementById('subscription-name').textContent = subscription.displayName;
        document.getElementById('subscription').style.display = 'flex';
        localData["subscriptionId"] = subscription.subscriptionId;

        return subscription.subscriptionId;
    })
    .then((subscriptionId) => getResourceGroups(token, subscriptionId))
    .then((response) => {
        // Lists resource groups and adds create button.
        var formElement = document.createElement('form');
        formElement.innerHTML = `<label>Project name</label><input type='text' class='input margin-bottom-20' name='resourceGroupName' /><button type='submit' class='button'>Add Project</button>`;
        document.getElementById('main').appendChild(formElement);

    })
    .catch((error)=> {
        console.log(error)
    });
}

function loginCallback(error, token, msg) {
    if (error) {
        console.log(error);
    } else {
        router.navigate('projects');
    }
}