import * as THREE from '../../../node_modules/three';

export default function pong3D() {
    const html = `
    <div id="three-canvas-container"></div>
    `;

    setTimeout(() => {
        const container = document.getElementById('three-canvas-container');
        
        // Ensure the container is available
        if (!container) return;

        // Remove any existing canvas inside the container before appending a new one
        const existingCanvas = container.querySelector('canvas');
        if (existingCanvas) {
            container.removeChild(existingCanvas); // Remove old canvas
        }

        // Create the scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Append the canvas to the container
        container.appendChild(renderer.domElement);

        // Create a cube and add it to the scene
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        // Animation loop
        let animationId;
        function animate() {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        }

        // Start animation
        animate();

        // Cleanup function
        function cleanup() {
            cancelAnimationFrame(animationId); // Stop the animation loop
            renderer.dispose(); // Dispose of the renderer
            scene.clear(); // Clear the scene
            container.removeChild(renderer.domElement); // Remove the canvas from DOM
            window.removeEventListener('popstate', cleanup); // Unregister cleanup on popstate
            window.removeEventListener('click', handleRouteChange); // Remove route change handler
        }

        // Handle route changes (for when the user navigates to another page)
        function handleRouteChange(event) {
            if (event.target.matches("[data-link]")) {
                cleanup(); // Clean up when navigating away
            }
        }

        // Add an event listener to trigger cleanup when navigation occurs
        window.addEventListener('popstate', cleanup);  // When browser back/forward is used
        window.addEventListener('click', handleRouteChange); // When internal navigation links are clicked
    }, 0);

    return html;
}
