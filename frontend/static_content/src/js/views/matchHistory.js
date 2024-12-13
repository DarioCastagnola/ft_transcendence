
import { fetchMatchHistory, fetchNicknameByPlayerId } from "../service/apiService.js";

export default function matchHistory() {
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
			<div class="card-container">
				<!-- CARD GENERATE DALLO SCRIPT -->
			</div>
		</div>

	</section>
    `;
	setTimeout(() => {

		prepareHistory();
		async function prepareHistory() {
			const history = await fetchMatchHistory(); // Recupera i dati
			//console.log("Match history = ", history);
		
			// Usa Promise.all per gestire le operazioni asincrone all'interno della mappatura
			const partiteGiocate = await Promise.all(history.map(async partita => {
				const nome1 = await fetchNicknameByPlayerId(partita.player1);
				const nome2 = await fetchNicknameByPlayerId(partita.player2);
		
				const punteggio = `${partita.player1_score} - ${partita.player2_score}`;
				const risultato = partita.winner === partita.player1 ? 'Vittoria' : 'Sconfitta';
		
				return {
					data: new Date(partita.created_at).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' }),
					teamA: nome1,
					teamB: nome2,
					punteggio: punteggio,
					risultato: risultato
				};
			}));

        //console.log("Partite giocate mappate = ", partiteGiocate);

        // Pulisce il contenitore prima di aggiungere nuove card
        const container = document.querySelector('.card-container');
        container.innerHTML = ''; 
		
		// // Seleziona il contenitore per le card
		// const container = document.querySelector('.card-container');
		// console.log(container);
		
		// Genera le card
		partiteGiocate.forEach((partita, index) => {
			let risultatoClass = partita.risultato.toLowerCase(); // "vittoria" o "sconfitta"
			let punteggio = partita.punteggio.split(' - '); // Divide il punteggio in due parti
			let teamA = partita.teamA;
			let teamB = partita.teamB;
		
			const cardHTML = `
				<div class="cardMatch">
					<div data-status="inprogress" class="teams">
						<div class="team-info team-home">
							<div class="team-info-container">
								<div class="team-name-info">${teamA}</div>
							</div>
						</div>
						<div class="event-scoreboard">
							<div class="event-score-container">
								<div class="current-time-container">
									<div class="event-current-time"></div>
									<div class="progress-dots" data-progress="1S">
										<div class="load"></div>
									</div>
								</div>
								<div class="score-container">
									<div class="score-home">${punteggio[0]}</div>
									<div class="custom-sep">-</div>
									<div class="score-away">${punteggio[1]}</div>
								</div>
							</div>
						</div>
						<div class="team-info team-away">
							<div class="team-info-container">
								<div class="team-icon-container"></div>
								<div class="team-name-info">${teamB}</div>
							</div>
						</div>
					</div>
				</div>
			`;
		
			// Aggiungi la card al contenitore
			container.innerHTML += cardHTML;
		
			// abilita lo scroll se ci sono più di 4 card
			if (index >= 3) { // Dalla 4ª card in poi
				container.style.overflowY = 'auto';
			}
		});
	}
	}, 0);
	return html;
}
    
	
