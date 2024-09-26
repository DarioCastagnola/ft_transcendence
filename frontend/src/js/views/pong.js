export default function pong() {
    const html = `
    <canvas id="myCanvas" justify-content="center" width="1200" height="650" style="border:3px solid #ffffff;">
	</canvas>
    `;
    setTimeout(() => {
		const canvas = document.getElementById("myCanvas");
		const ctx = canvas.getContext("2d");
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, 1200, 650);
		ctx.fillStyle = "white";
		ctx.fillRect(30, 280, 10, 65);
		ctx.fillRect(1165, 280, 10, 65);
    }, 0);
    return html;
}