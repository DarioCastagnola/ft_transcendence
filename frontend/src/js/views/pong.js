let gameInstance = null;

export default function pong() {
    const html = `
	<div class="row justify-content-center">
		<div class="col-12 col-md-8">
    		<canvas class ="w-100" id="myCanvas" style="border:3px solid #ffffff;"></canvas>
		</div>
	</div>
    `;

	// Cleanup previous instance
	    if (gameInstance) {
        cancelAnimationFrame(gameInstance);
    }

    setTimeout(() => {

		const canvas = document.getElementById("myCanvas");
		const ctx = canvas.getContext("2d");
		let isBallMoving = false;
		canvas.width = 1800;
		canvas.height = 900;

		const keys = {};
	
		class Paddle {
			constructor(user) {
				this.paddle_distance_from_border = 30;
				this.height = 95;
				this.width = 12;
				this.user = user;
				if (user == "user1")
				{
					this.x = this.paddle_distance_from_border;
					this.y = canvas.height / 2 - 50;
				}
				else if (user == "user2")
				{
					this.x = canvas.width - this.paddle_distance_from_border - this.width;
					this.y = canvas.height / 2 - 50;
				}
			}
			ft_draw() {
				ctx.fillStyle = "white";
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}

			ft_move(dy) {
				this.y += dy;
				if (this.y < 0) {
					this.y = 0;
				} else if (this.y + this.height > canvas.height) {
					this.y = canvas.height - this.height;
				}	
			}
		}

		class Player {
			constructor(user) {
				this.score = 0;
				this.user = user;
				this.paddle = new Paddle(this.user);
			}
			ft_movePaddle(dy) {
				this.paddle.ft_move(dy);
			}

			ft_drawScore() {
				ctx.font = "50px Helvetica";
				if (this.user === "user1")
					ctx.fillText(this.score,canvas.width - canvas.width / 2 - canvas.width / 10, canvas.height / 10);
				if (this.user === "user2")
					ctx.fillText(this.score,canvas.width - canvas.width / 2 + canvas.width / 10, canvas.height / 10)
			}
		}

		class Ball {
			constructor(x, y) {
				this.height = 15;
				this.width = 15;
				this.x = x - 10;
				this.y = y;
				this.dx = 7;
				this.dy = 4;
				this.starting_x = x - 10;
				this.starting_y = y;
			}
			ft_draw() {
				ctx.fillStyle = "white";
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}

			// Update the ball's position based on its velocity
			// Check for collision with the top or bottom walls
			// Resets position for collision with the lateral walls
			ft_move(player1, player2) {
				this.x += this.dx;
				this.y += this.dy;
				let realxofball = this.x - this.width;

				console.log("punto di contatto palla ", this.x);
				console.log("realxofball ", realxofball);
				console.log("x di player2paddle", player2.paddle.x);
				if (this.x - player2.paddle.x > this.width) {
					isBallMoving = false;
					player1.score += 1
				}
				if (this.y < 0 || this.y + this.height > canvas.height) {
					this.dy = -this.dy;
 				}
				if (this.x > canvas.width) {
					this.x = this.starting_x;
					this.y = this.starting_y;
					isBallMoving = false;
					player1.score += 1;
					console.log("player1: ", player1.score, "player2: ", player2.score);
				}
				if (this.x < 0) {
					this.x = this.starting_x;
					this.y = this.starting_y;
					isBallMoving = false;
					player2.score += 1;
					console.log("player1: ", player1.score, "player2: ", player2.score);
				}
			}
		}
		
		class Board {
			constructor(x, y, width, height) {
				this.x = x;
				this.y = y;
				this.width = width;
				this.height= height;
			}

			ft_draw() {
				ctx.fillStyle = "Black";
				ctx.fillRect(0, 0, this.width, this.height);
				ctx.fillStyle = "gray";
				let bottom = 50;
				while (bottom < this.height) {
					ctx.fillRect(this.width / 2 - 10, bottom, 15, 45);
					bottom += 100;
				}
			}
		}


		const board = new Board(canvas.width / 2 ,canvas.height / 2, canvas.width, canvas.height);
		ctx.fillStyle = "white";
		const player1 = new Player("user1");
		const player2 = new Player("user2");
		const ball = new Ball(canvas.width / 2 ,canvas.height / 2, player1, player2);


		// Handle keydown events
		// Set key state to true when pressed

		document.addEventListener("keydown", (event) => {
			const key = event.key.toLowerCase();
			keys[key] = true;

			if (key === "enter" && !isBallMoving) {
				isBallMoving = true;
			}
		});


		// Handle keyup events
		// Set key state to false when released

		document.addEventListener("keyup", (event) => {
			keys[event.key.toLowerCase()] = false;
		});


		// ft Game loop: this will run continuously to update and redraw the game state
		// 1. Clear the canvas
		// 2. Move paddles based on key presses
		// 3. Draw everything
		// 4. Loop the game

		function ft_gameLoop() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			
			if (keys["w"]) {
				player1.ft_movePaddle(-10);
			}
			if (keys["s"]) {
				player1.ft_movePaddle(10);
			}
			if (keys["arrowup"]) {
				player2.ft_movePaddle(-10);
			}
			if (keys["arrowdown"]) {
				player2.ft_movePaddle(10);
			}

			if (isBallMoving){
				ball.ft_move(player1, player2);
			}


			board.ft_draw();
			ball.ft_draw();
			player1.paddle.ft_draw();
			player1.ft_drawScore();
			player2.paddle.ft_draw();
			player2.ft_drawScore();

			gameInstance = requestAnimationFrame(ft_gameLoop);
	}
	ft_gameLoop();
    }, 0);

    return html;
}