class Header {
    constructor() {}

    load(options) {
        const params = options.params[0].split("/");
        const breadcrumbs = params.map((val, index) => {
           const arr = params.slice(0, index + 1);
           const href = arr.join('/');

           return {link: href, name: val};
        });

        return this.html = `
            <div class="flex header align-center">
                <a href="#" class="logo">Code Like A Kid</a>
                <div id="user" class="float-right flex">
                    <div class="icon m-right-sm">
                        <img src="images/user.png" />
                    </div>
                    <div id="user-name"></div>
                    <div id="subscription" class="m-left-md">
                        <div class="icon">
                            <img src="images/money_dollar.png" />
                        </div>
                        <div id="subscription-name"></div>
                    </div>
                    <a href="#" onclick="authContext.logOut(); return false;" class="m-left-md">Log out</a>
                </div>
            </div>
            <div class="breadcrumb flex align-center">
                ${breadcrumbs.map((breadcrumb, index) => `<a href='#${breadcrumb.link}'>${breadcrumb.name}</a>${breadcrumbs.length !== index + 1 ? '<div class="slash">/</div>': ''}`).join("")}
            </div>
            `
    }

    show(el) {
        const div = this.el = document.createElement("div")
        div.innerHTML = this.html
        el.appendChild(div)
    }

    postShow() {
        var user = authContext.getCachedUser();
        document.getElementById('user-name').textContent = user.userName;
        document.getElementById('user').style.display = 'flex';
    }
}