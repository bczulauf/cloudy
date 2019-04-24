class HomePage {
    constructor() {}

    load() {
        return this.html = `
            <div class="flex header align-center">
                <a href="#" class="logo">Code Like A Kid</a>
            </div>
            <div class="flex center">
                <div class="six">
                    <h1>Kids have it made.</h1>
                    <p>
                        Lunch? Check. Laundry? Done.
                    </p>
                    <p class="m-btm-md">
                        Who is taking care of you? You sad sack with your eye strain and bad back.
                        All you want to do is build a simple website. Well, we have you covered. We have been you and we didn't like it.
                        We didn't like configuring hosting, managing databases and servers, and setting up authentication, so we took care of all of it for you.
                    </p>
                    <button class="button" onclick="authContext.login(); return false;">Get Started</button>
                    <h3>
                        
                    </h3>
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