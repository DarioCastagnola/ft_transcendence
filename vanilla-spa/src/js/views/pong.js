export default function pong() {
    const html = `
    <canvas id="myCanvas" justify-content="center" width="1200" height="650" style="border:3px solid #ffffff;">
	</canvas>
    `;
    setTimeout(() => {
		const canvas = document.getElementById("myCanvas");
		const ctx = canvas.getContext("2d");

		class Player {
			constructor(x,y) {
				ctx.fillStyle = "white";
				ctx.fillRect(x, y, 10, 65);
			} 
		}

		class Ball {
			constructor() {
				ctx.beginPath();  // Start a new path
				ctx.arc(200, 200, 50, 0, 2 * Math.PI);  // Define the circle
				ctx.fillStyle = "blue";  // Set the fill color
				ctx.fill();  // Fill the circle with the current color
				ctx.strokeStyle = "white";  // Set the border color
				ctx.stroke();  // Draw the circle border
			}
		}

		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, 1200, 650);
		ctx.fillStyle = "white";
		const Ball1 = new Ball();
		const Player1 = new Player(30, 280);
		const Player2 = new Player(1165, 280);
    }, 0);
    return html;
}