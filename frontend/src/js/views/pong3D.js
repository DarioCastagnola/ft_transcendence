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

		const keys = {};
        
        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        // Camera
        const camera = new THREE.PerspectiveCamera(75, (window.innerWidth / 2) / (window.innerHeight / 2), 2, 1000);
        camera.position.z = 300;
        camera.position.set(200, 300, 400);
        camera.lookAt(scene.position);


        // Renderer
        const renderer = new THREE.WebGLRenderer();
        canvasContainer.innerHTML = ""; // Clear previous canvases if any

        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        canvasContainer.appendChild(renderer.domElement);

        // Grid
        const gridHelper = new THREE.GridHelper(400, 10, 0x888888, 0x444444);
        scene.add(gridHelper);

		// Ball (3D Sphere) Geometry
		const ballRadius = 8;
		const ballGeometry = new THREE.SphereGeometry(ballRadius);
		const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
		const Ball = new THREE.Mesh(ballGeometry, ballMaterial);

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
				this.paddleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
				this.paddle = new THREE.Mesh(this.paddleGeometry, this.paddleMaterial);
				this.x = 0;
			}

			getPaddleHeight() {
				return this.paddleHeight;
			}

			ft_addPaddleToScene() {
				if (this.user == "user1")
					this.paddle.position.set(this.x, this.paddleHeight / 2, 200);
				else if (this.user == "user2")
					this.paddle.position.set(this.x, this.paddleHeight / 2, -200);
				scene.add(this.paddle);
			}

			ft_move(x) {
				this.x += x;
				if (this.x < -170)
					this.x = -170;
				else if (this.x > 170)
					this.x = 170;
				if (this.user == "user1")
					this.paddle.position.set(this.x, this.paddleHeight / 2, 200);
				else if (this.user == "user2")
					this.paddle.position.set(this.x, this.paddleHeight / 2, -200);
			}
		}

        // Box Mesh
        const Player1 = new Player("user1");
		const Player2 = new Player("user2");

		Ball.position.set(0, Player1.paddle.getPaddleHeight() / 2, 0);
		Player1.paddle.ft_addPaddleToScene();
		Player2.paddle.ft_addPaddleToScene();
		scene.add(Ball);

		document.addEventListener("keydown", (event) => {
			const key = event.key.toLowerCase();
			keys[key] = true;
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
            gameInstance = requestAnimationFrame(gameLoop);
        }

        gameLoop();
    }, 0);

    return html;
}
