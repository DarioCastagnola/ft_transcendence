import home from "./views/home.js";
import about from "./views/about.js";
import contact from "./views/contact.js";
import login from "./views/login.js";
import register from "./views/register.js";

const routes = {
    "/": { title: "Home", render: home, css: "/styles/home.css" },
    "/about": { title: "About", render: about, css: "/styles/about.css" },
    "/contact": { title: "Contact", render: contact, css: "/styles/contact.css" },
    "/login": { title: "Login", render: login, css: "/styles/login.css" },
    "/register": { title: "Register", render: register, css: "/styles/register.css" },
};

let currentCSS = null;

function loadCSS(href) {
    if (currentCSS) {
        document.head.removeChild(currentCSS);
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
    currentCSS = link;
}

function router() {
    let view = routes[location.pathname];
    if (view) {
        document.title = view.title;
        app.innerHTML = view.render();
        if (view.css) {
            loadCSS(view.css);
        }
    } else {
        history.replaceState("", "", "/");
        router();
    }
}

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