import { router } from "../main.js";
import { apiFetch } from "../service/apiService.js";

export default function signIn() {
  const html = `
  <section>

		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>

		<div class="signin">
			<div class="content">
				<h2>Sign In</h2>
				<div id="signInForm" class="form">
					<div class="inputBox">
						<input type="email" id="username" required>
						<i>Username</i>
					</div>
					<div class="inputBox">
						<input type="password" id="password" required>
						<i>Password</i>
					</div>
						<div class="links">
						<a href="/signUp" data-link>Sign Up</a>
						<button id="loginWith42" class="login-button">Login with 42</button>
					</div>
					<div class="inputBox">
						<!-- Updated with id="loginButton" -->
						<input type="submit" id="loginButton" value="Sign In">
					</div>
				</div>
				<!-- Error message element -->
                <div id="errorMessage" class="error-message d-none"></div>

			</div>
		</div>

	</section>
  `;

  setTimeout(() => {
    const loginButton = document.getElementById('loginButton');
    const errorMessage = document.getElementById('errorMessage');

    // Add click event listener to the login button
    loginButton.addEventListener('click', async function (event) {
      event.preventDefault();

      // Hide any previous error message
      errorMessage.classList.add('d-none');
      errorMessage.textContent = '';

      // Get form values
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Basic validation (You can extend this as needed)
      if (!username || !password) {
        alert('Please enter both username and password.');
        return;
      }

      // Create the data object to send
      const loginData = {
        username,
        password,
      };

      // Send the form data to the API using fetch
	  const response = await apiFetch('https://localhost:4444/api/auth/login/', {
  	    method: 'POST',
        body: loginData
      });

      // Handle the API response
      const result = await response.json();
      if (response.ok) {
        // alert('Login successful!');
        //console.log('Login result:', result);
        // Redirect to another page or handle success
        if (result.message === '2FA abilitato, inserire OTP') {
          localStorage.setItem("username", username)
          window.history.pushState({}, '', '/2FA');
          router();
		  alert("ciao");
        } else {
		  window.history.pushState({}, '', '/home');
		  router();
        }
      } else {
        // alert(`Login failed: ${result.message}`);
        // Display the error message
        errorMessage.textContent = "Invalid Credentials";
        errorMessage.classList.remove('d-none');
      }
    });

	document.getElementById("loginWith42").addEventListener("click", () => {
		const clientId = 'u-s4t2ud-66d1325a205f85bce9bb8f729e8ee9fde0051355dbaf775183489f2c9faa4167';
		const redirectUri = 'https%3A%2F%2Flocalhost%3A4433%2Fcallback';

		const authorizationUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

		window.location.href = authorizationUrl;
	  });

  }, 0);

  return html;
}

