import { router } from "../main.js";
import { apiFetch } from "../service/apiService.js";
import { fetchUserInfo } from "../service/apiService.js";

export default function userinfo() {
  const html = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
   <div class="container">
	   <a class="navbar-brand" href="/home" data-link>Transcendence</a>
	   <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		   <span class="navbar-toggler-icon"></span>
	   </button>
   </div>
</nav>
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
						<input type="submit" value="Save" id="save-update">
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
				uploadImage(file);
        } else {
            console.log("Nessun file selezionato.");
        }
    });

	async function uploadImage(file) {
		const apiUrl = "https://localhost/api/core/user-profile/";
		console.log(file);
		try {
			let userInfo = await fetchUserInfo();
			let user_id = userInfo.id;
			const formData = new FormData();
			formData.append("user_id", user_id); // Append the user ID
			formData.append("avatar", file);    // Append the image file

			// Send the request
			const response = await apiFetch(apiUrl, {
				method: "POST",
				body: formData, // Pass the FormData
			});

			if (response.ok) {
				console.log("Image uploaded successfully.");
			} else {
				console.error("Error uploading image. Response status:", response.status);
			}
    } catch (error) {
        console.error("Network error:", error);
    }
	}

	async function fetchProfileImage() {
		try {
			// Ottenere l'ID dell'utente
			let userInfo = await fetchUserInfo();
			let user_id = userInfo.id;
			const apiUrl = `https://localhost/api/core/user-profile/${user_id}/`; // URL del backend
		
			// Chiamata all'API per ottenere il profilo utente
			const response = await apiFetch(apiUrl);
			if (!response.ok) {
				throw new Error("Errore nel recupero dell'immagine");
			}
			
			// Parse della risposta JSON
			const data = await response.json();
			console.log("Dati API:", data);
			const fullUrl = "https://localhost" + data.avatar;
	
			// Aggiornare l'immagine nel DOM
			document.getElementById("profile-img").src = fullUrl;
		} catch (error) {
			console.error("Errore:", error);
		}
	}
	
	
	//-----------------------------------------------------------------
	
	
	fetchProfileImage();
    const usernameElement = document.getElementById("user-username");
    const emailElement = document.getElementById("user-email");
    const enable2faButton = document.getElementById("enable2faButton");
    const logoutButton = document.getElementById("logoutButton");
    const qrCodeContainer = document.getElementById("qrCodeContainer");

	document.getElementById("save-update").addEventListener("click", async (event) => {
        event.preventDefault(); // Prevent default behavior
        await submitForm(); // Call the function
    });
	
	async function submitForm() {
		const apiUrl = `http://localhost/api/auth/update-user/`;
	
				const data = {
					username: document.getElementById("user-username").value,
        			email: document.getElementById("user-email").value
				};
				    const response = await apiFetch(apiUrl, {
				    method: 'PUT',
				    body: JSON.stringify(data),
				});
	
				if (response.ok) {
					console.log("User info updated correctly");
					return 0;
				} else {
				  console.error("Failed to update user info", response.status);
				  return null;
				}
	}


    fetchUserInfo().then((result) => {
		usernameElement.value = result.username;
		emailElement.value = result.email;
	});

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


	// const vittorie = 65; // percentuale vittoria
	// const sconfitte = 35; // percentuale sconfitta

	// const ctx = document.getElementById('myChart').getContext('2d');
	// const myChart = new Chart(ctx, {
	// 	type: 'doughnut',
	// 	data: {
	// 		labels: [`${vittorie}% Vittorie`, `${sconfitte}% Sconfitte`],
	// 		datasets: [{
	// 			data: [vittorie, sconfitte],
	// 			backgroundColor: [
	// 				'rgba(75, 192, 192, 0.6)', // Vittorie - blu
	// 				'rgba(255, 99, 132, 0.6)' // Sconfitte - rosso
	// 			],
	// 			borderColor: [
	// 				'rgba(75, 192, 192, 1)',
	// 				'rgba(255, 99, 132, 1)'
	// 			],
	// 			borderWidth: 3
	// 		}]
	// 	},
	// 	options: {
	// 		responsive: true,
	// 		maintainAspectRatio: false,
	// 		plugins: {
	// 			legend: {
	// 				position: 'bottom',
	// 			}
	// 		},
	// 		cutout: '60%'
	// 	}
	// });

	
	//GRAFICO

	// Percentuali vittorie e sconfitte
	const vittorie = 65; // percentuale vittoria
	const sconfitte = 35; // percentuale sconfitta

	// Configurazione del Canvas
	const canvas = document.getElementById('myChart');
	const ctx = canvas.getContext('2d');

	// Calcolo delle dimensioni del cerchio
	const width = canvas.width;
	const height = canvas.height;
	const centerX = width / 2;
	const centerY = height / 2;
	const radius = Math.min(width, height) / 2 - 10; // lascio un margine

	// Funzione per disegnare una fetta del grafico
	function drawSlice(context, x, y, radius, startAngle, endAngle, color) {
		context.beginPath();
		context.moveTo(x, y);
		context.arc(x, y, radius, startAngle, endAngle);
		context.closePath();
		context.fillStyle = color;
		context.fill();
	}

	// Disegna la fetta delle vittorie
	const total = 100; // Percentuale totale
	const startAngle = 0;
	const vittorieAngle = (vittorie / total) * 2 * Math.PI;
	drawSlice(ctx, centerX, centerY, radius, startAngle, vittorieAngle, 'rgba(75, 192, 192, 0.6)'); // blu

	// Disegna la fetta delle sconfitte
	const sconfitteAngle = (sconfitte / total) * 2 * Math.PI;
	drawSlice(ctx, centerX, centerY, radius, vittorieAngle, vittorieAngle + sconfitteAngle, 'rgba(255, 99, 132, 0.6)'); // rosso

	// Disegna il cerchio bianco al centro per creare l'effetto doughnut
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI); // Il 60% del raggio
	ctx.fillStyle = 'white';
	ctx.fill();

	// Disegna il testo al centro
	ctx.font = '16px Arial';
	ctx.fillStyle = '#333';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(`${vittorie}% Vittorie`, centerX, centerY - 10);
	ctx.fillText(`${sconfitte}% Sconfitte`, centerX, centerY + 15);


  }, 0);

  return html;
}


