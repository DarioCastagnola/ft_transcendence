import home from "./views/home.js";
import about from "./views/about.js";
import contact from "./views/contact.js";
import login from "./views/login.js";
import register from "./views/register.js";
import userinfo from "./views/userinfo.js";
import userinfoUpdate from "./views/userinfo-update.js";

const routes = {
    "/": { title: "Home", render: home, css: "./vanilla-spa/src/css/home.css" },
    "/about": { title: "About", render: about, css: "./vanilla-spa/src/css/about.css" },
    "/contact": { title: "Contact", render: contact, css: "./vanilla-spa/src/css/contact.css" },
    "/login": { title: "Login", render: login, css: "./vanilla-spa/src/css/home.css" },
    "/register": { title: "Register", render: register, css: "./vanilla-spa/src/css/home.css" },
    "/userinfo": { title: "UserInfo", render: userinfo, css: "./vanilla-spa/src/css/userinfo.css" },
    "/userinfo-update": { title: "UserInfo-update", render: userinfoUpdate, css: "./vanilla-spa/src/css/userinfo-update.css" },

};

let currentCSS = null;

function loadCSS(href) {
    if (currentCSS) {
        document.head.removeChild(currentCSS);
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css"; 
    link.href = href;
    document.head.appendChild(link);
    console.log(link);
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