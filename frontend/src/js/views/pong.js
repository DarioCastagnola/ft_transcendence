export default function pong() {
    const html = `
	<div class="row justify-content-center">
		<div class="col-12 col-md-8">
    		<canvas class ="w-100" id="myCanvas" style="border:3px solid #ffffff;"></canvas>
		</div>
	</div>
    `;
    setTimeout(() => {
		const canvas = document.getElementById("myCanvas");
		const ctx = canvas.getContext("2d");
		canvas.width = window.innerWidth * 0.6;
		canvas.height = window.innerHeight * 0.7;
	
		class Paddle {
			constructor(user) {
				this.paddle_distance_from_border = 30;
				this.height = 65;
				this.width = 10;
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
				this.paddle = new Paddle(user);
				this.ft_bindControls();
			}
			
			ft_bindControls() {
				document.addEventListener('keydown', (event) => {
					const key = event.key.toLowerCase(); // capture key press
					if (this.paddle.user === 'user1') {
						if (key === 'w') {
							this.ft_movePaddle(-10); // Move up
						} if (key === 's') {
							this.ft_movePaddle(10); // Move down
						}
					}	
					if (this.paddle.user === 'user2') {
						if (key === 'arrowup') {
							this.ft_movePaddle(-10)
						} if (key === 'arrowdown') {
							this.ft_movePaddle(10); // Move down
						}
					}
				});
			}
			ft_movePaddle(dy) {
				this.paddle.ft_move(dy);
			}
		}

		class Ball {
			constructor(x, y) {
				this.height = 10;
				this.width = 10;
				this.x = x;
				this.y = y;
			}

			ft_draw() {
				ctx.fillStyle = "white";  // Set the fill color
				ctx.fillRect(this.x, this.y, this.width, this.height);
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
				ctx.fillRect(0, 0, this.width, this.height)
			}
		}
		const board = new Board(canvas.width / 2 ,canvas.height / 2, canvas.width, canvas.height);
		ctx.fillStyle = "white";
		const ball = new Ball(canvas.width / 2 ,canvas.height / 2);
		const player1 = new Player("user1");
		const player2 = new Player("user2");
		ctx.font = "50px Arial";
		ctx.fillText("Pong", 550, 80);

		// ft Game loop: this will run continuously to update and redraw the game state
		// 1. Clear the canvas
		// 2. Draw everything
		// 3. Optional: You can also add ball movement and collision logic here
		// 4. Loop the game

		function ft_gameLoop() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		board.ft_draw();  // Draw the board background
		ball.ft_draw();   // Draw the ball
		player1.paddle.ft_draw();  // Draw player1's paddle
		player2.paddle.ft_draw();  // Draw player2's paddle

		requestAnimationFrame(ft_gameLoop);

	}
	ft_gameLoop();
    }, 0);
    return html;
}