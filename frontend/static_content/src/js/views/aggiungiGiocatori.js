import { router } from "../main.js";
import { apiFetch } from "../service/apiService.js";

export default function aggiungiGiocatori() {
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
                    <h2>Giocatori</h2>
                    <div id="signInForm" class="form">
                        <select id="numPlayers">
                            <option value="">Seleziona</option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                        </select>
                        <div id="playerNamesContainer"></div>

                        <div class="inputBox">
                            <a data-link>
                                <input type="submit" id="creaTorneo" value="Inizia torneo">
                            </a>
                        </div>
                    </div>
                </div>
            </div>

      </section>

      <footer class="custom-footer text-white text-center py-3">
          <p>© 2024 Transcendence. Lde-mich, Dcastagn, Mlongo, Dfiliag.</p>
      </footer>

          `;

          function calculateMatches(numPlayers) {
            return (numPlayers * (numPlayers - 1)) / 2;
        }

          setTimeout(() => {
              document.querySelector(".signin .content").innerHTML = html;
              const creaTorneoButton = document.getElementById('creaTorneo');
              
              // Assegna la funzione `generatePlayerInputs` all'evento `change` del selettore
              const numPlayersSelect = document.getElementById("numPlayers");
              numPlayersSelect.addEventListener("change", generatePlayerInputs);
              
              //////////////////////////////////////////////////////////////////////////////////////
              
              creaTorneoButton.addEventListener('click', async function(event) {
                  const playerInputs = document.querySelectorAll("#playerNamesContainer input");
                  const playerNames = Array.from(playerInputs).map(input => input.value);
                  localStorage.setItem("MatchesLeftToPlay", calculateMatches(playerNames.length + 1));

                const apiUrl = "https://localhost:4444/api/game/tournaments/";

                // Ensure all fields are filled
                if (playerNames.some(name => !name)) {
                    // alert("Please fill in all player names.");
                    return;
                }

                // Prepare the data to be sent
                const data = {
                    type: "TOURNAMENT",
                    max_participants: playerNames.length + 1,
                    duration: 600,
                    point_to_win: 5
                };

                //console.log(data)

                // Send the data to the API
                const response = await apiFetch(apiUrl, {
                    method: "POST",
                    body: data
                });

                if (response.ok) {
                    // Handle successful response, e.g., redirect or show a success message
                    // alert("Tournament created successfully!");

                    for (const username of playerNames) {
                        const data = { nickname: username, type: "GUEST" };
                        const apiUrl = "https://localhost:4444/api/game/tournaments/add-player/";

                        // Send the data to the API
                        const response = await apiFetch(apiUrl, {
                            method: "POST",
                            body: data
                        });

                        if (!response.ok) {
                            console.error(`Failed to add player ${username}:`, response.status);
                            // alert(`Error adding player ${username}.`);
                        } else {
                            console.log(`Player ${username} added successfully!`);
                        }
                    }

                    // Redirect or show a success message after all requests are done
                    // alert("All players added successfully!");

                    localStorage.setItem("isTournament", "true")
                    localStorage.setItem("opponentType", "human")
                    history.pushState({}, '', '/pong');
                    router()
                } else {
                    console.error("Failed to create tournament:", response.status);
                    // alert("Error creating tournament.");
                }
            })
        }, 0);

        // Funzione per generare gli input
        function generatePlayerInputs() {
            const numPlayers = parseInt(document.getElementById("numPlayers").value);
            const playerNamesContainer = document.getElementById("playerNamesContainer");

            // Svuota gli input precedenti
            playerNamesContainer.innerHTML = "";

            // Crea input per i nomi dei giocatori
            for (let i = 1; i <= numPlayers - 1; i++) {
                const label = document.createElement("label");

                const input = document.createElement("input");
                input.type = "text";
                input.name = `player${i}`;
                input.placeholder = `Player ${i}`;

                playerNamesContainer.appendChild(label);
                playerNamesContainer.appendChild(input);
                playerNamesContainer.appendChild(document.createElement("br")); // Aggiunge una linea tra gli input
            }
        }

        return html;
    }

