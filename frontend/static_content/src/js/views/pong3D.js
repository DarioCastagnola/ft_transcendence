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
		let isBallMoving = false;
        
        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        // Camera
		// const camerax = 0;
		// const cameray = 300;
		// const cameraz = 300;
        const camera = new THREE.PerspectiveCamera(75, (window.innerWidth / 2) / (window.innerHeight / 2), 2, 1000);
        camera.position.set(0, 300, 300);		
        camera.lookAt(scene.position);


        // Renderer
        const renderer = new THREE.WebGLRenderer();
        canvasContainer.innerHTML = ""; // Clear previous canvases if any

        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        canvasContainer.appendChild(renderer.domElement);

        // Grid
		const gridSize = 500;
        const gridHelper = new THREE.GridHelper(gridSize, 10, 0x888888, 0x444444);
        scene.add(gridHelper);
		const borderWidth = gridSize;
		const borderHeight = 50;
		const borderDepth = 10;
		const borderGeometry = new THREE.BoxGeometry( borderWidth,  borderHeight,  borderDepth);
		const borderMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
		const rightBorder = new THREE.Mesh( borderGeometry,  borderMaterial);
		const collisionBorder = new THREE.Box3().setFromObject(rightBorder);
		rightBorder.position.set(gridSize / 2 + borderDepth, borderHeight / 2, 0);
		rightBorder.rotation.y = Math.PI / 2;
		const leftBorder = rightBorder.clone();
		leftBorder.position.set(-(gridSize / 2 + borderDepth), borderHeight / 2, 0);
		scene.add(rightBorder);
		scene.add(leftBorder);
		
		// Ball (3D Sphere) Geometry
		// const ballRadius = 8;
		// const ballGeometry = new THREE.SphereGeometry(ballRadius);
		// const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
		// const Ball = new THREE.Mesh(ballGeometry, ballMaterial);
		
		class Ball {
			constructor(y) {
				this.ballRadius = 8;
				this.ballGeometry = new THREE.SphereGeometry(this.ballRadius);
				this.ballMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
				this.Ball = new THREE.Mesh(this.ballGeometry, this.ballMaterial);
				this.collisionBall = new THREE.Sphere().setFromObject(this.Ball);
				console.log(this.collisionBall);
				this.y = y;
				this.x = 0;
				this.z = 0;
				//s stands for starting values
				this.sy = y;
				this.sx = 0;
				this.sz = 0;
				//d stands for directional values
				this.dx = 7;
				this.dz = 4;
			}
			
			ft_addBallToScene() {
				this.Ball.position.set(this.sx, this.sy, this.sz);
				scene.add(this.Ball);
			}
			
			ft_move() {
				this.z += this.dz;
				this.x += this.dx;
				this.Ball.position.set(this.x, this.y, this.z);
				if (this.collisionBall.intersectsBox(collisionBorder)) {
					console.log("Collision detected!");
				}
			}
		}
		
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
					this.paddle.position.set(this.x, this.paddleHeight / 2, (gridSize / 2));
				else if (this.user == "user2")
					this.paddle.position.set(this.x, this.paddleHeight / 2, -(gridSize / 2));
				scene.add(this.paddle);
			}

			ft_move(x) {
				this.x += x;
				if (this.x < -((gridSize / 2) - (this.paddleWidth / 2)))
					this.x = -((gridSize / 2) - (this.paddleWidth / 2));
				else if (this.x > (gridSize / 2) - (this.paddleWidth / 2))
					this.x = (gridSize / 2) - (this.paddleWidth / 2);
				if (this.user == "user1")
					this.paddle.position.set(this.x, this.paddleHeight / 2, (gridSize / 2));
				else if (this.user == "user2")
					this.paddle.position.set(this.x, this.paddleHeight / 2, -(gridSize / 2));
			}
		}

        // Box Mesh
        const Player1 = new Player("user1");
		const Player2 = new Player("user2");
		const BallOBJ = new Ball(Player1.paddle.getPaddleHeight() / 2);

		// Ball.position.set(0, Player1.paddle.getPaddleHeight() / 2, 0);
		BallOBJ.ft_addBallToScene();
		Player1.paddle.ft_addPaddleToScene();
		Player2.paddle.ft_addPaddleToScene();

		// scene.add(Ball);

		document.addEventListener("keydown", (event) => {
			const key = event.key.toLowerCase();
			keys[key] = true;
			if (key === "enter" && !isBallMoving) {
				isBallMoving = true;
			}
		});

		document.addEventListener("keyup", (event) => {
			keys[event.key.toLowerCase()] = false;
		});
        

        // Game loop
        function gameLoop() {
            renderer.render(scene, camera);
			if (keys["a"]) {
				Player1.ft_move_paddle(-10);
			}
			if (keys["d"]) {
				Player1.ft_move_paddle(10);
			}
			if (keys["arrowleft"]) {
				Player2.ft_move_paddle(-10);
			}
			if (keys["arrowright"]) {
				Player2.ft_move_paddle(10);
			}

			if (isBallMoving){
				BallOBJ.ft_move();
			}
            gameInstance = requestAnimationFrame(gameLoop);
        }

        gameLoop();
    }, 0);

    return html;
}
