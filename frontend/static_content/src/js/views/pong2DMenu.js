import { router } from "../main.js"
import { apiFetch } from "../service/apiService.js";

export default function pong2DMenu() {
    const html = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
    <div class="container">
		<a class="navbar-brand" href="/home" data-link>Transcendence</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
</nav>


<section class="prova">
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	<span></span>

	<section>
		<div class="cellPong">
			<a id="partitaRapidaButton" class="menuTesto" href="#" data-link>Partita rapida</a>
		</div>
		<div class="cellPong">
			<a id="torneoButton" class="menuTesto">Torneo</a>
		</div>
	</section>

</section>

<!-- Modal -->
<div class="modal fade" id="botOrHumanModal" tabindex="-1" aria-labelledby="botOrHumanModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content custom-modal-dark">
            <div class="modal-header">
                <h5 class="modal-title" id="botOrHumanModalLabel">Scegli il tuo avversario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Vuoi che il tuo avversario sia un bot o un giocatore umano?
            </div>
            <div class="modal-footer">
                <button id="botOpponentButton" type="button" class="btn btn-primary" data-bs-dismiss="modal">Bot</button>
                <button id="humanOpponentButton" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Giocatore umano</button>
            </div>
        </div>
    </div>
</div>

<footer class="custom-footer text-white text-center py-3">
    <p>© 2024 Transcendence. Tutti i diritti riservati.</p>
</footer>
        `;

setTimeout(() => {

	async function isTournamentActive() {
		const apiUrl = 'https://localhost:4444/api/game/tournaments/open/';
		const response = await apiFetch(apiUrl);

		if (response.status == 404) {
			return false;
		} else {
			return true;
		}
	}

	async function chooseTheRoute() {
		if (await isTournamentActive()) {
			history.pushState({}, '', '/preTorneoCorso');
			router();
		} else {
			history.pushState({}, '', '/aggiungiGiocatori');
			router();
		}
	}



	document.querySelectorAll('.cellPong').forEach(cell => {
		cell.addEventListener('mouseenter', () => {
			document.querySelector('.prova').classList.add('prova-active');
		});

		cell.addEventListener('mouseleave', () => {
			document.querySelector('.prova').classList.remove('prova-active');
		});
	});
    const torneoButton = document.getElementById("torneoButton");

    torneoButton.addEventListener('click', () => {
		chooseTheRoute();
	});

	const partitaRapidaButton = document.getElementById("partitaRapidaButton");
    partitaRapidaButton.addEventListener('click', () => {
        // Show the modal
        const botOrHumanModal = new bootstrap.Modal(document.getElementById('botOrHumanModal'));
        botOrHumanModal.show();
    });

    // Handle modal button clicks
    document.getElementById('botOpponentButton').addEventListener('click', () => {
        localStorage.setItem("isTournament", "false");
        localStorage.setItem("opponentType", "bot");
        history.pushState({}, '', '/pong');
        router();
    });

    document.getElementById('humanOpponentButton').addEventListener('click', () => {
        localStorage.setItem("isTournament", "false");
        localStorage.setItem("opponentType", "human");
        history.pushState({}, '', '/pong');
        router();
    });

	}, 0);

    return html;
}
