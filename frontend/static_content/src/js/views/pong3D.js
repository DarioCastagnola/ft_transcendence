import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js';

let gameInstance = null;

export default function pong3D() {
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

		<section class="image-section">
			<div class="cellPong">
				<div id="threejs-canvas"></div>
        <div id="scorePlayer1" style="position: absolute; top: 10px; left: 20px; color: white; font-size: 24px;">Player 1: 0</div>
            <div id="scorePlayer2" style="position: absolute; top: 10px; right: 20px; color: white; font-size: 24px;">Player 2: 0</div>
			</div>
		</section>

</section>

<footer class="custom-footer text-white text-center py-3">
    <p>© 2024 Transcendence. Tutti i diritti riservati.</p>
</footer>
    `;

	// const html = `<div id="threejs-canvas"></div>`

    if (gameInstance) {
        cancelAnimationFrame(gameInstance);
    }

    setTimeout(() => {


		// OVERLAY ---------------------------------------------------------

		const overlay = document.createElement('div');
		overlay.id = 'overlay';

		overlay.innerHTML = `
			<div id="overlay">
				<div class="game-screen">
					<div class="content">
						<h2 class="player">Player 1 vs Player 2</h2>
						<button class="start-button">Start Game</button>
					</div>
				</div>
			</div>
		`;

    	document.body.appendChild(overlay);

		// durata overlay
		// setTimeout(() => {
		// 	overlay.remove();
		// }, 3000);



		// GIOCO PONG 3D -------------------------------------------------------

        const canvasContainer = document.getElementById("threejs-canvas");

		const keys = {};
		let isBallMoving = false;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        // Camera
		// const camerax = 0;
		// const cameray = 300;
		// const cameraz = 300;
        const camera = new THREE.PerspectiveCamera(75, (window.innerWidth / 2) / (window.innerHeight / 2), 2, 1000);
        camera.position.set(400, 300, 0);
        camera.lookAt(scene.position);


        // Renderer
        const renderer = new THREE.WebGLRenderer();
        canvasContainer.innerHTML = ""; // Clear previous canvases if any

        renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.75);
        canvasContainer.appendChild(renderer.domElement);

        // Grid
		const gridSize = 500; // Width of the grid
		const gridSizeY = 700; // Height of the grid
		const divisions = 10; // Number of divisions
		const gridHelper = new THREE.GridHelper(gridSize, divisions, 0x888888, 0x444444);
		gridHelper.scale.set(1, 1, gridSizeY / gridSize); // Scale Z to make a rectangle
		scene.add(gridHelper);


		const borderWidth = gridSizeY;
		const borderHeight = 50;
		const borderDepth = 1;
		const borderGeometry = new THREE.BoxGeometry( borderWidth,  borderHeight,  borderDepth);
		const borderMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
		
		
		const rightBorder = new THREE.Mesh( borderGeometry,  borderMaterial);
		rightBorder.position.set(gridSize / 2 + borderDepth / 2, borderHeight / 2, 0);
		rightBorder.rotation.y = Math.PI / 2;
		scene.add(rightBorder);


		const leftBorder = rightBorder.clone();
		leftBorder.position.set(-(gridSize / 2 + borderDepth / 2), borderHeight / 2, 0);
		scene.add(leftBorder);


		const goalWidth = gridSize;
		const goalHeight = 50;
		const goalDepth = 1;
		const goalGeometry = new THREE.BoxGeometry( goalWidth,  goalHeight,  goalDepth);
		const goalMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });


		const rightGoal = new THREE.Mesh(goalGeometry, goalMaterial);
		rightGoal.position.set(0, borderHeight / 2, gridSizeY / 2 + goalDepth / 2);
		scene.add(rightGoal);

		
		const leftGoal = rightGoal.clone();
		leftGoal.position.set(0, borderHeight / 2, -(gridSizeY / 2 + goalDepth / 2))
		scene.add(leftGoal);

		const rightBorderBox = new THREE.Box3().setFromObject(rightBorder);
		const leftBorderBox = new THREE.Box3().setFromObject(leftBorder);
		const rightGoalBox = new THREE.Box3().setFromObject(rightGoal);
		const leftGoalBox = new THREE.Box3().setFromObject(leftGoal);



		class Ball {
			constructor(y, Player1, Player2) {
				this.Player1 = Player1;
				this.Player2 = Player2;
				this.last_touched_by;
				this.ballRadius = 8;
				this.ballGeometry = new THREE.SphereGeometry(this.ballRadius);
				this.ballMaterial = new THREE.MeshBasicMaterial({ color: 0xdbdbdb });
				this.Ball = new THREE.Mesh(this.ballGeometry, this.ballMaterial);
				this.y = y;
				this.x = 0;
				this.z = 0;
				//s stands for starting values
				this.sy = y;
				this.sx = 0;
				this.sz = 0;
				//d stands for directional values
				this.dx = 3;
				this.dz = 2;

				this.collisionBall = new THREE.Box3().setFromObject(this.Ball);
			}

			ft_addBallToScene() {
				this.Ball.position.set(this.sx, this.sy, this.sz);
				scene.add(this.Ball);
			}

			ft_move() {
				this.z += this.dz;
				this.x += this.dx;
				this.Ball.position.set(this.x, this.y, this.z);
				this.collisionBall.setFromObject(this.Ball);

				if (this.collisionBall.intersectsBox(leftGoalBox)) {
					console.log("GOOOL");
					this.Player1.score += 1;
					document.getElementById("scorePlayer1").textContent = "Player 1: " + this.Player1.score;
					console.log("Player1 = " + this.Player1.score + " Player2 = " + this.Player2.score);
					if (this.Player1.score >= 5) {
						const scores = {
							player1Score: this.Player1.score,
							player2Score: this.Player2.score
						};
				
						// // Send POST request to the backend
						// fetch('/your-backend-endpoint', {
						// 	method: 'POST',
						// 	headers: {
						// 		'Content-Type': 'application/json'
						// 	},
						// 	body: JSON.stringify(scores)
						// })
						// .then(response => {
						// 	if (response.ok) {
						// 		console.log('Scores sent successfully');
						// 		window.location.href = "/game-over";
						// 	} else {
						// 		console.error('Failed to send scores');
						// 	}
						// })
						// .catch(error => {
						// 	console.error('Error:', error);
						// });
						window.location.href = "/pong3DMenu";
					}
					this.z = this.sz;
					this.x = this.sx;
					this.Ball.position.set(this.sx, this.sy, this.sz);
					isBallMoving = false;
				}
				if (this.collisionBall.intersectsBox(rightGoalBox)) {
					console.log("GOOOL");
					this.Player2.score += 1;
					document.getElementById("scorePlayer2").textContent = "Player 2: " + this.Player2.score;
					console.log("Player1 = " + this.Player1.score + " Player2 = " + this.Player2.score);
					if (this.Player2.score >= 5) {
						const scores = {
							player1Score: this.Player1.score,
							player2Score: this.Player2.score
						};
						
						window.location.href = "/pong3DMenu";
						// // Send POST request to the backend
						// fetch('/your-backend-endpoint', {
						// 	method: 'POST',
						// 	headers: {
						// 		'Content-Type': 'application/json'
						// 	},
						// 	body: JSON.stringify(scores)
						// })
						// .then(response => {
						// 	if (response.ok) {
						// 		console.log('Scores sent successfully');
						// 		window.location.href = "/pong3DMenu";
						// 	} else {
						// 		console.error('Failed to send scores');
						// 	}
						// })
						// .catch(error => {
						// 	console.error('Error:', error);
						// });
					}
					this.z = this.sz;
					this.x = this.sx;
					this.Ball.position.set(this.sx, this.sy, this.sz);
					isBallMoving = false;
				}
				if (this.collisionBall.intersectsBox(leftBorderBox) || this.collisionBall.intersectsBox(rightBorderBox)) {
					this.dx *= -1; // Reverse direction on the x-axis
					console.log("Bounce off vertical border!");
				}
				if (this.collisionBall.intersectsBox(this.Player1.paddle.paddleHitBox) && this.last_touched_by != this.Player1) {
					this.dz *= -1; // Reverse direction on the x-axis
					this.last_touched_by = this.Player1;
					console.log("Bounce off left paddle!");
				}
				if (this.collisionBall.intersectsBox(this.Player2.paddle.paddleHitBox) && this.last_touched_by != this.Player2) {
					this.dz *= -1; // Reverse direction on the x-axis
					this.last_touched_by = this.Player2;
					console.log("Bounce off right paddle!");
				}
			}
		}

        class Player {
			constructor(user) {
				this.user = user;
				this.paddle = new Paddle(this.user);
				this.score = 0;
			}

			ft_move_paddle(x) {
				this.paddle.ft_move(x);
			}
		}

		class Paddle {
			constructor(user) {
				this.paddleWidth = 60;
				this.paddleHeight = 50;
				this.paddleDepth = 10;
				this.user = user;
				this.paddleGeometry = new THREE.BoxGeometry(this.paddleWidth, this.paddleHeight, this.paddleDepth);
				this.paddleMaterial = new THREE.MeshBasicMaterial({ color: 0xdbdbdb });
				this.paddle = new THREE.Mesh(this.paddleGeometry, this.paddleMaterial);
				this.paddleHitBox = new THREE.Box3().setFromObject(this.paddle);

				this.x = 0;
			}

			getPaddleHeight() {
				return this.paddleHeight;
			}

			ft_addPaddleToScene() {
				if (this.user == "user1") {
					this.paddle.position.set(this.x, this.paddleHeight / 2, (gridSize / 2));
					this.paddleHitBox.setFromObject(this.paddle);
				}
				else if (this.user == "user2") {
					this.paddle.position.set(this.x, this.paddleHeight / 2, -(gridSize / 2));
					this.paddleHitBox.setFromObject(this.paddle);
				}
				scene.add(this.paddle);
			}

			ft_move(x) {
				this.x += x;
				if (this.x < -((gridSize / 2) - (this.paddleWidth / 2)))
					this.x = -((gridSize / 2) - (this.paddleWidth / 2));
				else if (this.x > (gridSize / 2) - (this.paddleWidth / 2))
					this.x = (gridSize / 2) - (this.paddleWidth / 2);
				if (this.user == "user1") {
					this.paddle.position.set(this.x, this.paddleHeight / 2, (gridSize / 2));
					this.paddleHitBox.setFromObject(this.paddle);
				}
				else if (this.user == "user2") {
					this.paddle.position.set(this.x, this.paddleHeight / 2, -(gridSize / 2));
					this.paddleHitBox.setFromObject(this.paddle);
				}
			}
		}

        const Player1 = new Player("user1");
		const Player2 = new Player("user2");
		const BallOBJ = new Ball(Player1.paddle.getPaddleHeight() / 2, Player1, Player2);

		BallOBJ.ft_addBallToScene();
		Player1.paddle.ft_addPaddleToScene();
		Player2.paddle.ft_addPaddleToScene();

		document.addEventListener("keydown", (event) => {
			const key = event.key.toLowerCase();
			keys[key] = true;
			if (key === "enter" && !isBallMoving) {
				isBallMoving = true;
			}
		});

		document.addEventListener("keyup", (event) => {
			keys[event.key.toLowerCase()] = false;
		});


        // Game loop
        function gameLoop() {
            renderer.render(scene, camera);
			if (keys["w"]) {
				Player1.ft_move_paddle(-10);
			}
			if (keys["s"]) {
				Player1.ft_move_paddle(10);
			}
			if (keys["arrowup"]) {
				Player2.ft_move_paddle(-10);
			}
			if (keys["arrowdown"]) {
				Player2.ft_move_paddle(10);
			}

			if (isBallMoving){
				BallOBJ.ft_move();
			}
            gameInstance = requestAnimationFrame(gameLoop);
        }

        gameLoop();

    }, 0);

    return html;
}


{/* <div class="signin">
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
				<a href="/pong3D" data-link>
					<input type="submit" id="creaTorneo" value="Inizia torneo">
				</a>    
			</div>
		</div>
	</div>
</div> */}