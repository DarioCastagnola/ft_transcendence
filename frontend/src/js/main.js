import home from "./views/home.js";
import about from "./views/about.js";
import contact from "./views/contact.js";
import login from "./views/login.js";
import register from "./views/register.js";
import userinfo from "./views/userinfo.js";
import userinfoUpdate from "./views/userinfo-update.js";
import pong from "./views/pong.js";
import pong3D from "./views/pong3D.js";


const routes = {
    "/": { title: "Home", render: home, css: "./frontend/src/css/home.css" },
    "/home": { title: "Home", render: home, css: "./frontend/src/css/home.css" },
    "/about": { title: "About", render: about, css: "./frontend/src/css/about.css" },
    "/contact": { title: "Contact", render: contact, css: "./frontend/src/css/contact.css" },
    "/login": { title: "Login", render: login, css: "./frontend/src/css/home.css" },
    "/register": { title: "Register", render: register, css: "./frontend/src/css/home.css" },
    "/userinfo": { title: "UserInfo", render: userinfo, css: "./frontend/src/css/userinfo.css" },
    "/userinfo-update": { title: "UserInfo-update", render: userinfoUpdate, css: "./frontend/src/css/userinfo-update.css" },
    "/pong": { title: "pong", render: pong, css: "./frontend/src/css/pong.css"},
    "/pong3D": { title: "pong3D", render: pong3D, css: "./frontend/src/css/pong3D.css"},
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
    //console.log(link);
    currentCSS = link;
}

export function router() {
    // const app = document.getElementById('app');
    let view = routes[location.pathname];
    if (view) {
        // console.log(view.title);
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
