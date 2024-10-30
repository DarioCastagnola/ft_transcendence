import { router } from "../main.js";
import { apiFetch } from "../service/apiService.js";

export default function userinfo() {
  const html = `
  <section>

		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>

		<div class="signin">
			<div class="content">
				<h2>My Profile</h2>
				
				<!-- IMMAGINE -->
				<div class="profile-picture">
					<img src="https://via.placeholder.com/100" alt="Profile Image">
					<label for="profile-image" class="upload-icon">📷</label>
					<input type="file" id="profile-image" accept="image/*">
				</div>
		
				<!-- FORM -->
				<div id="signInForm" class="form">
					<div class="inputBox">
						<input type="text" id="nome" required>
						<i>Username</i>
					</div>
					<div class="inputBox">
						<input type="text" id="cognome" required>
						<i>Mail</i>
					</div>
					<div class="inputBox">
						<input type="submit" onclick="submitForm()" value="Save">
					</div>
				</div>
				
				<!-- BOTTONE 2FA -->
				<button class="button">Enable 2FA</button>
			</div>

			<div style="width: 0; height: 300px; border: 1px solid #333; margin: 25px; "></div>
			
			<!-- GRAFICO -->
			<div class="chart-container">
				<canvas id="myChart" width="300" height="300"></canvas>
				<a href="/matchHistory" data-link class="button2">MATCH HISTORY</a>
			</div>
			
			
			</div>
			</section>
			
			<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
			<script src="myProfile.js"></script>
			`;
			
  
  setTimeout(() => {
    const usernameElement = document.getElementById("user-username");
    const emailElement = document.getElementById("user-email");
    const accessToken = localStorage.getItem("access");
    const enable2faButton = document.getElementById("enable2faButton");
    const logoutButton = document.getElementById("logoutButton");
    const qrCodeContainer = document.getElementById("qrCodeContainer");


    async function fetchUserInfo() {
      const apiUrl = 'http://localhost:8002/api/auth/user-info/';
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
        const enable2faUrl = 'http://localhost:8002/api/auth/enable-2fa/';
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


