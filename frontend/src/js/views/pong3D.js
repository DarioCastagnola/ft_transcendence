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

        // Paddle (3D Rectangle) Geometry
        const boxWidth = 80;
        const boxHeight = 50;
        const boxDepth = 10;
        const boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        // Box Material
		
		class Paddle {
			constructor(user) {
				this.paddleWidth = 80;
				this.paddleHeight = 50;
				this.paddleDepth = 10;
				this.user = user;
				this.paddleGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
				this.paddleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
				this.paddle = new THREE.Mesh(this.paddleGeometry, this.paddleMaterial);
			}

			ft_addPaddleToScene() {
				if (this.user == "user1")
					this.paddle.position.set(0, boxHeight / 2, 200);
				else if (this.user == "user2")
					this.paddle.position.set(0, boxHeight / 2, -200);
				scene.add(this.paddle);
			}
		}

        // Box Mesh
        const Paddle1 = new Paddle("user1");
		const Paddle2 = new Paddle("user2");

		Ball.position.set(0, boxHeight / 2, 0);
		Paddle1.ft_addPaddleToScene();
		Paddle2.ft_addPaddleToScene();
		scene.add(Ball);
        

        // Game loop
        function gameLoop() {
            renderer.render(scene, camera);
            gameInstance = requestAnimationFrame(gameLoop);
        }

        gameLoop();
    }, 0);

    return html;
}
