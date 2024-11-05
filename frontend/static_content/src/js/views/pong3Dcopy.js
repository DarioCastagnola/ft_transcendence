import * as THREE from 'three';

let gameInstance = null;

export default function pong3D() {
    const html = `
    <div class="row justify-content-center">
        <div class="col-12 col-md-8">
            <div id="threejs-canvas"></div>
        </div>
    </div>
    `;

    if (gameInstance) {
        cancelAnimationFrame(gameInstance);
    }

    setTimeout(() => {
        const canvasContainer = document.getElementById("threejs-canvas");
        
        // Scene setup

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        // Camera
        const camera = new THREE.PerspectiveCamera(75, (window.innerWidth / 2) / (window.innerHeight / 2), 0.1, 1000);
        camera.position.z = 400;
        // Position the camera at an angle
        camera.position.set(200, 300, 500); // Adjust x, y, z for optimal view
        camera.lookAt(scene.position); // Ensure it looks at the center of the scene


        // Renderer
        const renderer = new THREE.WebGLRenderer();
        canvasContainer.innerHTML = ""; // Clear previous canvases if any

        console.log(canvasContainer.clientWidth, canvasContainer.clientHeight)
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        canvasContainer.appendChild(renderer.domElement);

        // Game variables
        const paddleHeight = 95;
        const paddleWidth = 12;
        const paddleDepth = 20;
        const ballSize = 16;
        const speedMultiplier = 1.05;
        let isBallMoving = false;
        const gridHelper = new THREE.GridHelper(1400, 20, 0x888888, 0x444444);
        gridHelper.position.y = -300; // Place it below paddles
        scene.add(gridHelper);

        // Controls
        const keys = {};

        class Paddle {
            constructor(user) {
                this.user = user;
                this.score = 0;
                const geometry = new THREE.BoxGeometry(paddleWidth, paddleHeight, paddleDepth);
                const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                this.mesh = new THREE.Mesh(geometry, material);

                if (user === "user1") {
                    this.mesh.position.set(-600, 0, 0);
                } else {
                    this.mesh.position.set(600, 0, 0);
                }
                scene.add(this.mesh);
            }

            move(dy) {
                this.mesh.position.y += dy;
                // Boundaries
                if (this.mesh.position.y + paddleHeight / 2 > 290) {
                    this.mesh.position.y = 290 - paddleHeight / 2;
                } else if (this.mesh.position.y - paddleHeight / 2 < -290) {
                    this.mesh.position.y = -290 + paddleHeight / 2;
                }
            }
        }

        class Ball {
            constructor() {
                const geometry = new THREE.BoxGeometry(ballSize, ballSize, ballSize);
                const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                this.mesh = new THREE.Mesh(geometry, material);
                this.resetPosition();
                scene.add(this.mesh);
            }

            resetPosition() {
                this.mesh.position.set(0, 0, 0);
                this.dx = Math.random() < 0.5 ? 7 : -7;
                this.dy = Math.random() < 0.5 ? 4 : -4;
            }

            move(player1, player2) {
                this.mesh.position.x += this.dx;
                this.mesh.position.y += this.dy;

                // Paddle collision
                if (this.mesh.position.x > player2.mesh.position.x - paddleWidth / 2 && 
                    this.mesh.position.x < player2.mesh.position.x + paddleWidth / 2 &&
                    this.mesh.position.y < player2.mesh.position.y + paddleHeight / 2 &&
                    this.mesh.position.y > player2.mesh.position.y - paddleHeight / 2) {
                    this.dx = -this.dx * speedMultiplier;
                    this.dy *= speedMultiplier;
                }
                if (this.mesh.position.x < player1.mesh.position.x + paddleWidth / 2 && 
                    this.mesh.position.x > player1.mesh.position.x - paddleWidth / 2 &&
                    this.mesh.position.y < player1.mesh.position.y + paddleHeight / 2 &&
                    this.mesh.position.y > player1.mesh.position.y - paddleHeight / 2) {
                    this.dx = -this.dx * speedMultiplier;
                    this.dy *= speedMultiplier;
                }

                // Top and bottom collision
                if (this.mesh.position.y > 290 || this.mesh.position.y < -290) {
                    this.dy = -this.dy;
                }

                // Side walls and scoring
                if (this.mesh.position.x > 700) {
                    player1.score += 1;
                    console.log("Player 1 scores!");
                    this.resetPosition();
                    isBallMoving = false;
                } else if (this.mesh.position.x < -700) {
                    player2.score += 1;
                    console.log("Player 2 scores!");
                    this.resetPosition();
                    isBallMoving = false;
                }
            }
        }

        // Initialize paddles and ball
        const player1 = new Paddle("user1");
        const player2 = new Paddle("user2");
        const ball = new Ball();

        // Keyboard events
        document.addEventListener("keydown", (event) => {
            keys[event.key.toLowerCase()] = true;
            if (event.key.toLowerCase() === "enter" && !isBallMoving) {
                isBallMoving = true;
            }
        });

        document.addEventListener("keyup", (event) => {
            keys[event.key.toLowerCase()] = false;
        });

        // Game loop
        function gameLoop() {
            // Paddle movement
            if (keys["w"]) player1.move(10);
            if (keys["s"]) player1.move(-10);
            if (keys["arrowup"]) player2.move(10);
            if (keys["arrowdown"]) player2.move(-10);

            // Ball movement
            if (isBallMoving) {
                ball.move(player1, player2);
            }

            // Render scene
            renderer.render(scene, camera);
            gameInstance = requestAnimationFrame(gameLoop);
        }

        gameLoop();
    }, 0);

    return html;
}
