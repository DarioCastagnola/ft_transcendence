export default function pong() {
    const html = `
    <canvas id="myCanvas" justify-content="center" width="1200" height="650" style="border:3px solid #ffffff;">
	</canvas>
    `;
    setTimeout(() => {
		const canvas = document.getElementById("myCanvas");
		const ctx = canvas.getContext("2d");
		const paddle_distance_from_border = 30;
		const paddle_height = 65;

		class Paddle {
			constructor(user) {
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
				ctx.fillStyle = "Black";
				ctx.fillRect(0, 0, width, height)
			}
		}
		const board = new Board(canvas.width / 2 ,canvas.height / 2, canvas.width, canvas.height);
		ctx.fillStyle = "white";
		const ball = new Ball(canvas.width / 2 ,canvas.height / 2);
		const player1 = new Player("user1");
		const player2 = new Player("user2");
		// const player1 = new Player(paddle_distance_from_border, 280, 10, 65);
		// const player2 = new Player(canvas.width - paddle_distance_from_border - 10, 280, 10, 65);

		ctx.font = "50px Arial";
		ctx.fillText("Pong", 550, 80);
    }, 0);
    return html;
}