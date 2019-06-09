class DatabasePage {
    constructor() {}

    load(options) {
        const token = this.token = authContext.getCachedToken('https://management.azure.com/');
        this.resouceGroupName = options.params[1];

        return getSubscriptions(token)
        .then((response) => {
            return this.subscription = response.value[0];
        })
        .then((subscription) => getDatabases(token, subscription.subscriptionId))
        .then((response) => {
            const database = response.value[0];

            return this.html = `
                <div class="flex container">
                    <div class="three">
                        <ul class="nav">
                            <li class="flex">
                                <img src="images/database.png" class="m-right-sm" />
                                <div>Database</div>
                            </li>
                            <li class="flex">
                                <img src="images/world.png" class="m-right-sm" />
                                <div>Website</div>
                            </li>
                        </ul>
                    </div>
                    <div class="nine right-side">
                        ${database ? '' : `<button id="add-database" class="button flex">
                            <img src="images/database_add.png" class="m-right-sm" />
                            <div>Add New Database</div>
                        </button>`}
                    </div>
                </div>
                `;
            });
    }

    show(el) {
        const div = this.el = document.createElement("div")
        div.innerHTML = this.html
        el.appendChild(div)
    }

    postShow() {
        document.getElementById('add-database').addEventListener('click', (evt) => {
            createDatabaseAccount(this.token, this.subscriptionId, this.resouceGroupName, this.resouceGroupName).then((response) => {
                console.log(response);
            });
        });
    }
}