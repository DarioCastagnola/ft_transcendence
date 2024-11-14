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
					<img id="profile-img" src="https://via.placeholder.com/100" alt="Profile Image">
					<input type="file" id="profile-image" accept="image/*">
				</div>

				<!-- FORM -->
				<div id="signInForm" class="form">
					<div class="inputBox">
						<input type="text" id="user-username" required>
						<i>Username</i>
					</div>
					<div class="inputBox">
						<input type="text" id="user-email" required>
						<i>Mail</i>
					</div>
					<div class="inputBox">
						<input type="submit" onclick="submitForm()" value="Save">
					</div>
				</div>

				<!-- Contenitore per bottoni e QR Code -->
				<div class="button-qr-container">
					<div class="button-group">
						<button id="enable2faButton" class="button">Enable 2FA</button>
						<button id="logoutButton" class="button">Logout</button>
					</div>

					<!-- QR-CODE -->
					<div class="qrCode">
						<div id="qrCodeContainer" class="mt-3"></div> <!-- Container for the QR code -->
					</div>
				</div>


			</div>

			<div style="width: 0; height: 300px; border: 1px solid #333; margin: 25px; "></div>

			<!-- GRAFICO -->
			<div class="chart-container">
				<canvas id="myChart" width="300" height="300"></canvas>
				<a href="/matchHistory" data-link class="button2">MATCH HISTORY</a>
			</div>

			</div>
			</section>

			`;


  setTimeout(() => {

	// UPLOAD IMMAGINE ----------------------------------------------

	document.getElementById("profile-image").addEventListener("change", function() {
        var reader = new FileReader();

        reader.onload = function() {
            var output = document.getElementById('profile-img');
            output.src = reader.result; // Cambia l'immagine con quella selezionata
        };

        var file = this.files[0]; // Ottieni il file dal <input>
        if (file) {
            reader.readAsDataURL(file); // Usa il file selezionato
        } else {
            console.log("Nessun file selezionato.");
        }
    });

	//-----------------------------------------------------------------


	
    const usernameElement = document.getElementById("user-username");
    const emailElement = document.getElementById("user-email");
    const enable2faButton = document.getElementById("enable2faButton");
    const logoutButton = document.getElementById("logoutButton");
    const qrCodeContainer = document.getElementById("qrCodeContainer");


    async function fetchUserInfo() {
      const apiUrl = 'https://localhost/api/auth/user-info/';
      const response = await apiFetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        usernameElement.value = data.username;
        emailElement.value = data.email;
      } else {
        console.error("Failed to fetch user info", response.status);
      }
    }

    fetchUserInfo();

    // Enable 2FA button click handler
    enable2faButton.addEventListener('click', () => {

      async function enable2FAFetch() {
        const enable2faUrl = 'http://localhost/api/auth/enable-2fa/';
        const response = await apiFetch(enable2faUrl, {"method": "POST"});

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

    logoutButton.addEventListener('click', async function (event) {
      event.preventDefault();

      const apiUrl = 'https://localhost/api/auth/logout/';
      await apiFetch(apiUrl, {method: "POST"});
      window.history.pushState({}, '', '/signIn');
      router();
    });


	//GRAFICO

	const vittorie = 65; // percentuale vittoria
	const sconfitte = 35; // percentuale sconfitta

	const ctx = document.getElementById('myChart').getContext('2d');
	const myChart = new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: [`${vittorie}% Vittorie`, `${sconfitte}% Sconfitte`],
			datasets: [{
				data: [vittorie, sconfitte],
				backgroundColor: [
					'rgba(75, 192, 192, 0.6)', // Vittorie - blu
					'rgba(255, 99, 132, 0.6)' // Sconfitte - rosso
				],
				borderColor: [
					'rgba(75, 192, 192, 1)',
					'rgba(255, 99, 132, 1)'
				],
				borderWidth: 3
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					position: 'bottom',
				}
			},
			cutout: '60%'
		}
	});
  }, 0);

  return html;
}


