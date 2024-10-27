import { router } from "../main.js";

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
    const apiUrl = 'http://localhost:8002/api/auth/user-info/';
    const usernameElement = document.getElementById("user-username");
    const emailElement = document.getElementById("user-email");
    const accessToken = localStorage.getItem("access");
    const enable2faButton = document.getElementById("enable2faButton");
    const qrCodeContainer = document.getElementById("qrCodeContainer");

    // Fetch user info
    fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          window.history.pushState({}, '', '/home');
          router();
        }
        return response.json();
      })
      .then(data => {
        usernameElement.textContent = data.username;
        emailElement.textContent = data.email;
      })
      .catch(error => console.error("Error fetching user info:", error));

    // Enable 2FA button click handler
    enable2faButton.addEventListener('click', () => {
      const enable2faUrl = 'http://localhost:8002/api/auth/enable-2fa/';

      fetch(enable2faUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) throw new Error('Failed to enable 2FA.');
        return response.json();
      })
      .then(data => {
        const otpUri = encodeURIComponent(data.otp_uri);
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${otpUri}&size=150x150`;
        // Display the QR code image
        qrCodeContainer.innerHTML = `<img src="${qrCodeUrl}" alt="QR Code for 2FA" width="150">`;
      })
      .catch(error => {
        console.error("Error enabling 2FA:", error);
        alert("An error occurred while enabling 2FA. Please try again.");
      });
    });
  }, 0);

  return html;
}


