class TokenPage {
    constructor() {}

    load() {
        return this.html = `
            <div class="flex header align-center">
                <a href="#" >Code Like A Kid</a>
            </div>
            <div class="flex center">
                <div class="five">
                    <p>Kids do <u>not</u> manage servers. Why should you?</p>
                    <a href="#" onclick="authContext.login(); return false;">Login</a>
                </div>
            </div>
            `;
    }

    show(el) {
        const div = this.el = document.createElement("div");
        div.innerHTML = this.html;
        el.appendChild(div);
    }
}