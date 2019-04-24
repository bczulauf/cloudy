class ProjectsPage {
    constructor() {}

    load() {
        const token = this.token = authContext.getCachedToken('https://management.azure.com/');

        return getSubscriptions(token)
        .then((response) => {
            return this.subscription = response.value[0];
        })
        .then((subscription) => getResourceGroups(token, subscription.subscriptionId))
        .then((response) => {
            const projects = response.value;

            return this.html = `
                <div class="flex container">
                    <div class="three">
                        <ul class="nav">
                            <li class="flex">
                                <img src="images/folder.png" class="m-right-sm">
                                <a href="#projects">Projects</a>
                            </li>
                            <li class="flex">
                                <img src="images/page_white_text.png" class="m-right-sm">
                                <a href="#projects">Documentation</a>
                            </li>
                        </ul>
                    </div>
                    <div class="nine right-side">
                        <button id="add-project" class="button flex">
                            <img src="images/folder_add.png" class="m-right-sm" />
                            <div>Add New Project</div>
                        </button>
                        <ul id="projects-list" class="list">
                            ${projects.map((project) => `<li><a href='#projects/${project.name}'>${project.name}</a></li>`).join('')}
                        </ul>
                        <div class="popup" id="project-popup">
                            <img src="images/cross.png" id="close-popup" />
                            <form id="create-resource-form">
                                <label class="m-btm-sm">Enter Project Name</label>
                                <input type="text" name="resourceGroupName" class="input m-btm-sm" />
                                <button class="button">Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    show(el) {
        const div = this.el = document.createElement("div");
        div.innerHTML = this.html;
        el.appendChild(div);
    }

    postShow() {
        const popup = document.getElementById('project-popup');
        document.getElementById('add-project').addEventListener('click', (evt) => {
            popup.style.display = "block";
        });

        document.getElementById('close-popup').addEventListener('click', (evt) => {
            popup.style.display = "none";
        });

        document.getElementById('create-resource-form').addEventListener('submit', (evt) => {
            evt.preventDefault()
            var resourceGroupName = new FormData(evt.target).get('resourceGroupName');
            createResourceGroup(this.token, this.subscription.subscriptionId, resourceGroupName).then((response) => {
                const node = document.createElement("li");
                node.innerHTML = `<a href="${response.name}">${response.name}</a>`;
                document.getElementById('projects-list').prepend(node);
                popup.style.display = 'none';
            });
        }, false);
    }
}