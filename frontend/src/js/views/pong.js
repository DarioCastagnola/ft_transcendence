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
				this.height = 10;
				this.width = 10;
				this.x = x - 10;
				this.y = y;
				this.dx = 5;
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
				// ctx.fillRect(this.width / 2 - 10, 50, 10, 30);
				// ctx.fillRect(this.width / 2 - 10, 50 + 60, 10, 30);
				// ctx.fillRect(this.width / 2 - 10, 50 + 120, 10, 30);
				// ctx.fillRect(this.width / 2 - 10, 50 + 180, 10, 30);
				// ctx.fillRect(this.width / 2 - 10, 50 + 240, 10, 30);
				// ctx.fillRect(this.width / 2 - 10, 50 + 300, 10, 30);
				// ctx.fillRect(this.width / 2 - 10, 50 + 360, 10, 30);
				// ctx.fillRect(this.width / 2 - 10, 50 + 420, 10, 30);
				// ctx.fillRect(this.width / 2 - 10, 50 + 480, 10, 30);
			}
		}


		const board = new Board(canvas.width / 2 ,canvas.height / 2, canvas.width, canvas.height);
		ctx.fillStyle = "white";
		const ball = new Ball(canvas.width / 2 ,canvas.height / 2);
		const player1 = new Player("user1");
		const player2 = new Player("user2");


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
		// 4. Optional: You can also add ball movement and collision logic here
		// 5. Loop the game

		function ft_gameLoop() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			
			if (keys["w"]) {
				player1.ft_movePaddle(-5);
			}
			if (keys["s"]) {
				player1.ft_movePaddle(5);
			}
			if (keys["arrowup"]) {
				player2.ft_movePaddle(-5);
			}
			if (keys["arrowdown"]) {
				player2.ft_movePaddle(5);
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