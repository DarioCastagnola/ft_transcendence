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
	
		class Paddle {
			constructor(user) {
				const paddle_distance_from_border = 30;
				var height = 65;
				var width = 10;
				if (user == "user1")
				{
					var x = paddle_distance_from_border;
					var y = canvas.height / 2 - 50;
				}
				else if (user == "user2")
				{
					var x = canvas.width - paddle_distance_from_border - width;
					var y = canvas.height / 2 - 50;
				}
				ctx.fillStyle = "white";
				ctx.fillRect(x, y, width, height);
			}
		}

		class Player {
			constructor(user) {
				var paddle = new Paddle(user);
			} 
		}

		class Ball {
			constructor(x, y) {
				var height = 10;
				var width = 10;
				ctx.fillStyle = "white";  // Set the fill color
				ctx.fillRect(x, y, width, height);
			}
		}
		
		class Board {
			constructor(x, y, width, height) {
				this.resizeCanvas();
				window.addEventListener('resize', this.resizeCanvas);
				// ctx.fillStyle = "Black";
				// ctx.fillRect(0, 0, width, height)
			}

			resizeCanvas  = function() {
				// Set canvas width and height to match the window's size or a percentage of it
				canvas.width = window.innerWidth * 0.6; // 90% of window width
				canvas.height = window.innerHeight * 0.5; // 80% of window height
			
				// Optional: Redraw any content or background after resizing
				ctx.fillStyle = 'black';
				ctx.fillRect(0, 0, canvas.width, canvas.height);
			}
		}
		const board = new Board(canvas.width / 2 ,canvas.height / 2, canvas.width, canvas.height);
		ctx.fillStyle = "white";
		const ball = new Ball(canvas.width / 2 ,canvas.height / 2);
		const player1 = new Player("user1");
		const player2 = new Player("user2");
		ctx.font = "50px Arial";
		ctx.fillText("Pong", 550, 80);
    }, 0);
    return html;
}