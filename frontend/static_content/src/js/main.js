
import welcome from "./views/welcome.js";
import home from "./views/home.js";
import signIn from "./views/signIn.js";
import signUp from "./views/SignUp.js";
import about from "./views/about.js";
import contact from "./views/contact.js";
import userInfo from "./views/userInfo.js";
import pong from "./views/pong.js";
import matchHistory from "./views/matchHistory.js";
import twoFA from "./views/twoFA.js";
import pong3D from "./views/pong3D.js";
import pong2DMenu from "./views/pong2DMenu.js";
import pong3DMenu from "./views/pong3DMenu.js";
import preTorneoCorso from "./views/preTorneoCorso.js";
import aggiungiGiocatori from "./views/aggiungiGiocatori.js";
import userList from "./views/userList.js";
import { apiFetch, updateLastSeen } from "./service/apiService.js";


const routes = {
    "/": { title: "Welcome", render: welcome, css: "./src/css/welcome.css" },
    "/home": { title: "Home", render: home, css: "./src/css/home.css" },
    "/signUp": { title: "SignUp", render: signUp, css: "./src/css/signUp.css" },
    "/signIn": { title: "SignIn", render: signIn, css: "./src/css/signIn.css" },
    "/userInfo": { title: "UserInfo", render: userInfo, css: "./src/css/userInfo.css" },
    "/about": { title: "About", render: about, css: "./src/css/about.css" },
    "/contact": { title: "Contact", render: contact, css: "./src/css/contact.css" },
    "/2FA": { title: "2FA", render: twoFA, css: "./src/css/twoFA.css" },
    "/pong": { title: "pong", render: pong, css: "./src/css/pong.css"},
    "/matchHistory": { title: "matchHistory", render: matchHistory, css: "./src/css/matchHistory.css" },
    "/pong3D": { title: "pong3D", render: pong3D, css: "./src/css/pong3D.css"},
    "/pong2DMenu": { title: "pong2DMenu", render: pong2DMenu, css: "./src/css/pong2DMenu.css"},
    "/pong3DMenu": { title: "pong3DMenu", render: pong3DMenu, css: "./src/css/pong3DMenu.css"},
    "/preTorneoCorso": { title: "preTorneoCorso", render: preTorneoCorso, css: "./src/css/preTorneoCorso.css"},
    "/aggiungiGiocatori": { title: "aggiungiGiocatori", render: aggiungiGiocatori, css: "./src/css/aggiungiGiocatori.css"},
    "/userList": { title: "userList", render: userList, css: "./src/css/userList.css"}
};

// Call the function every 5 minutes (300,000 milliseconds)
setInterval(updateLastSeen, 75000);

// Optionally, call it immediately the first time
updateLastSeen();

const protected_routes = [
    "/home",
    "/userInfo",
    "/2FA",
    "/pong",
    "/matchHistory",
    "/pong3D",
    "/pong2DMenu",
    "/pong3DMenu",
    "/preTorneoCorso",
    "/aggiungiGiocatori"
];

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
    currentCSS = link;
}

async function handleOAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    if (authCode) {
      const apiUrl = `https://localhost:4242/api/auth/oauth/callback/?code=${authCode}`
      const response = await apiFetch(apiUrl)

      // Handle the API response
      const result = await response.json();
      if (response.ok) {
        history.pushState({}, '', '/home');
        router();
      } else {
        history.pushState({}, '', '/signIn');
        router();
      }
    } else {
        // console.error('Authorization code missing from callback URL');
        history.pushState({}, '', '/signIn');
        router();
    }
}

export function router() {
    const app = document.getElementById('app');
    let view = routes[location.pathname];
    // console.log(view)
    if (view) {
        // if (protected_routes.includes(location.pathname) && (!localStorage.getItem("access") || !localStorage.getItem("refresh"))) {
        //     window.history.pushState({}, '', '/');
        //     router();
        //     return ;
        // }
        // console.log(view.title);
        // alert("wait")
        document.title = view.title;
        app.innerHTML = view.render();
        if (view.css) {
            loadCSS(view.css);
        }
    } else if (location.pathname === '/callback') {
        handleOAuthCallback();
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
