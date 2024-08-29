import home from "./views/home.js";
import about from "./views/about.js";
import contact from "./views/contact.js";
import login from "./views/login.js";
import register from "./views/register.js";

const routes = {
    "/": { title: "Home", render: home },
    "/about": { title: "About", render: about },
    "/contact": { title: "Contact", render: contact },
    "/login": { title: "Login", render: login },
    "/register": { title: "Register", render: register },
};

function router() {
    let view = routes[location.pathname];
    console.log(view);
    if (view) {
        document.title = view.title;
        app.innerHTML = view.render();
    } else {
        history.replaceState("", "", "/");
        router();
    }
};

// Handle navigation
window.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        history.pushState("", "", e.target.href);
        router();
    }
});

// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);