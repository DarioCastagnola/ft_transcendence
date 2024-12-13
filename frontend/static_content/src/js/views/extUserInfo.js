import { apiFetch, getStats } from "../service/apiService.js";
import { getUsernameById } from "../service/apiService.js";

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
          <h2>Profile</h2>

          <div class="profile-picture">
            <img id="profile-img" src="https://via.placeholder.com/100" alt="Profile Image">
          </div>

          <div id="signInForm" class="form">
            <div class="inputBox">
              <p id="user-username"><i>Username</i></p>
            </div>
          </div>
        </div>

        <div style="width: 0; height: 300px; border: 1px solid #333; margin: 25px;"></div>

        <div class="chart-container">
          <canvas id="myChart" width="300" height="300"></canvas>
          <a href="/extMatchHistory" data-link class="button2">MATCH HISTORY</a>
        </div>
      </div>
    </section>
  `;


	setTimeout(() => {

		async function fetchStatsChart(option) {
					let user_id = sessionStorage.getItem("clickedUserId");
					// console.log("player_id =", user_id);
					const games = await getStats(Number(user_id));
					// console.log(games);
					// Calculate total matches
					const totalMatches = games.wins + games.losses + games.draws;
		
					// Calculate percentages
					const winPercentage = ((games.wins / totalMatches) * 100).toFixed(1);
					const lossPercentage = ((games.losses / totalMatches) * 100).toFixed(1);
		
					if (option === "vittorie")
						return winPercentage;
					else
						return lossPercentage;
				}
			
		const profileImageElement = document.getElementById("profile-img");
		const usernameElement = document.getElementById("user-username");
		// const emailElement = document.getElementById("user-email");

		async function fetchAndUpdateUserInfo() {
			try {
			// Fetch user info
			const userName = await getUsernameById(Number(sessionStorage.getItem("clickedUserId")));
			console.log(userName);
			usernameElement.innerText = userName;
			// emailElement.innerText = userInfo.email;

			// Fetch and update profile image
			const apiUrl = `https://localhost:4242/api/core/user-profile/${Number(sessionStorage.getItem("clickedUserId"))}/`;
			const response = await apiFetch(apiUrl);

			if (response.ok) {
				const data = await response.json();
				profileImageElement.src = `https://localhost:4242${data.avatar}`;
			} else {
				console.error("Failed to fetch profile image");
			}
			} catch (error) {
			console.error("Error fetching user info or profile image:", error);
			}
		}

		fetchAndUpdateUserInfo();

		//GRAFICO
	async function createChart() {
		
		// Percentuali vittorie e sconfitte
		const vittorie = await fetchStatsChart("vittorie"); // percentuale vittoria
		const sconfitte = await fetchStatsChart(); // percentuale sconfitta
	
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
		drawSlice(ctx, centerX, centerY, radius, startAngle, vittorieAngle, 'rgb(53, 31, 255)'); // blu
	
		// Disegna la fetta delle sconfitte
		const sconfitteAngle = (sconfitte / total) * 2 * Math.PI;
		drawSlice(ctx, centerX, centerY, radius, vittorieAngle, vittorieAngle + sconfitteAngle, 'rgba(255, 19, 70, 0.6)'); // rosso
	
		// Disegna il cerchio bianco al centro per creare l'effetto doughnut
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI); // Il 60% del raggio
		ctx.fillStyle = '#222';
		ctx.fill();
	
		// Disegna il testo al centro
		ctx.font = '16px Arial';
		ctx.fillStyle = 'rgb(217, 255, 0)';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(`${vittorie}%`, centerX - 30, centerY - 10);
		ctx.fillStyle = 'rgb(53, 31, 255)';
		ctx.fillText(` Vittorie`, centerX + 20, centerY - 10);
		ctx.fillStyle = 'rgb(217, 255, 0)';
		ctx.fillText(`${sconfitte}%`, centerX - 30, centerY + 15);
		ctx.fillStyle = 'rgb(255, 19, 70)';
		ctx.fillText(` Sconfitte`, centerX + 28, centerY + 15);
	
		}
		createChart();
		}, 0);

		return html;
	}