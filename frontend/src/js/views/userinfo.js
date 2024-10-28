import { router } from "../main.js";
import { apiFetch } from "../service/apiService.js";

export default function userinfo() {
  const html = `
  <div class="container">
      <div class="main-body">
            <div class="row gutters-sm">
              <div class="col-md-4 mb-3">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
                      <div class="mt-3">
                        <h4 id="user-username">ciao</h4>
                        <p class="text-muted font-size-sm">Online</p>
                        <button class="btn btn-primary">Add to friend list</button>
                        <button id="logoutButton" class="btn btn-warning mt-2">Logout</button>
                        <button id="enable2faButton" class="btn btn-warning mt-2">Enable 2FA</button>
                        <div id="qrCodeContainer" class="mt-3"></div> <!-- Container for the QR code -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="card mb-3">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Email</h6>
                      </div>
                      <div class="col-sm-9 text-secondary" id="user-email">
                      </div>
                    </div>
                    <hr>
                    <div class="row">
                      <div class="col-sm-12">
                        <a href="/userinfo-update" data-link class="btn btn-info" target="__blank">Edit</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  `;

  setTimeout(() => {
    const usernameElement = document.getElementById("user-username");
    const emailElement = document.getElementById("user-email");
    const accessToken = localStorage.getItem("access");
    const enable2faButton = document.getElementById("enable2faButton");
    const logoutButton = document.getElementById("logoutButton");
    const qrCodeContainer = document.getElementById("qrCodeContainer");


    async function fetchUserInfo() {
      const apiUrl = 'http://localhost/api/auth/user-info/';
      const response = await apiFetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        usernameElement.textContent = data.username;
        emailElement.textContent = data.email;
      } else {
        console.error("Failed to fetch user info", response.status);
      }
    }

    fetchUserInfo();

    // Enable 2FA button click handler
    enable2faButton.addEventListener('click', () => {

      async function enable2FAFetch() {
        const enable2faUrl = 'http://localhost/api/auth/enable-2fa/';
        const response = await apiFetch(enable2faUrl);

        if (response.ok) {
          const data = await response.json();
          const otpUri = encodeURIComponent(data.otp_uri);
          const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${otpUri}&size=150x150`;
          qrCodeContainer.innerHTML = `<img src="${qrCodeUrl}" alt="QR Code for 2FA" width="150">`;
        } else {
          console.error("Failed to fetch user info", response.status);
        }
      }

      enable2FAFetch()
    });

    logoutButton.addEventListener('click', () => {
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
      window.history.pushState({}, '', '/login');
      router();
    });
  }, 0);

  return html;
}


