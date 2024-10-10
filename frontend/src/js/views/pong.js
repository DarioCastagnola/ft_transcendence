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
		const speedMultiplier = 1.05;
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
					ctx.fillText(this.score,canvas.width - canvas.width / 2 + canvas.width / 10, canvas.height / 10);
				if (this.user === "user1" && this.score === 5) {
					ctx.fillText("YOU WIN!",canvas.width / 5, canvas.height / 2);
					ctx.fillText("YOU LOSE",canvas.width - canvas.width / 2 + canvas.width / 10, canvas.height / 2);
				}
				if (this.user === "user2" && this.score === 5) {
					ctx.fillText("YOU LOSE",canvas.width / 5, canvas.height / 2);
					ctx.fillText("YOU WIN!",canvas.width / 2 + canvas.width / 10, canvas.height / 2);
				}
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
				this.starting_dx = 7;
				this.starting_dy = 4;
				this.starting_x = x - 10;
				this.starting_y = y;
				this.last_touched_by;
			}
			ft_draw() {
				ctx.fillStyle = "white";
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}

			// Update the ball's position based on its velocity
			// Check for collision with the paddles, if found adjust vertical speed based on where the ball hits the paddle and speeds up the ball
			// Check for collision with the top or bottom walls
			// Resets position and updates score for collision with the lateral walls
			ft_move(player1, player2) {
				this.x += this.dx;
				this.y += this.dy;


				if (this.x + this.width > player2.paddle.x && this.x < player2.paddle.x + player2.paddle.width &&
					this.y < player2.paddle.y + player2.paddle.height && this.y + this.height > player2.paddle.y &&
					this.last_touched_by != player2) {
					this.dx = -this.dx;
					const paddleCenter = player2.paddle.y + player2.paddle.height / 2;
					const ballCenter = this.y + this.height / 2;
					const distanceFromCenter = ballCenter - paddleCenter;
					
					this.dy += distanceFromCenter * 0.1;

					this.dx *= speedMultiplier;
					this.dy *= speedMultiplier;
					this.last_touched_by = player2;	
				}
				if (this.x < player1.paddle.x + player1.paddle.width && this.x + this.width > player1.paddle.x &&
					this.y < player1.paddle.y + player1.paddle.height && this.y + this.height > player1.paddle.y &&
					this.last_touched_by != player1) {
					this.dx = -this.dx;

					const paddleCenter = player1.paddle.y + player1.paddle.height / 2;
					const ballCenter = this.y + this.height / 2;
					const distanceFromCenter = ballCenter - paddleCenter;
    
					this.dy += distanceFromCenter * 0.1;
					
					this.dx *= speedMultiplier;
					this.dy *= speedMultiplier;
					this.last_touched_by = player1;
				}
				if (this.y < 0 || this.y + this.height > canvas.height) {
					this.dy = -this.dy;
 				}
				if (this.x > canvas.width) {
					this.ft_resetPosition();
					isBallMoving = false;
					player1.score += 1;
					console.log("player1: ", player1.score, "player2: ", player2.score);
				}
				if (this.x < 0) {
					this.ft_resetPosition();
					isBallMoving = false;
					player2.score += 1;
					console.log("player1: ", player1.score, "player2: ", player2.score);
				}
			}

			ft_resetPosition() {
				if (this.last_touched_by === player1) {
					this.dx = this.starting_dx;
					this.dy = this.starting_dy;
				}
				else if (this.last_touched_by === player2) {
					this.dx = -this.starting_dx;
					this.dy = -this.starting_dy;
				}
				this.x = this.starting_x;
				this.y = this.starting_y;
				this.last_touched_by = 0;
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
		// 4. Ball's movement
		// 5. Loop the game

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