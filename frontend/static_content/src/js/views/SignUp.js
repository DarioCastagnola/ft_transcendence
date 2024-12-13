import { router } from "../main.js";
import { apiFetch, fetchUserProfileById, fetchUserInfo } from "../service/apiService.js";

export default function signUp() {
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
			<h2>Sign up</h2>
			<div id="signupForm" class="form">

				

				<div class="inputBox">
					<input type="text" id="username" required>
					<i>Username</i>
				</div>
				<!-- Error message for username -->
				<div id="usernameError" class="error-message d-none"></div>

				<div class="inputBox">
					<input type="email" id="email" required>
					<i>Email</i>
				</div>
				<!-- Error message for email -->
				<div id="emailError" class="error-message d-none"></div>

				<div class="inputBox">
					<input type="password" id="password" required>
					<i>Password</i>
				</div>
				<div class="inputBox">
					<input type="password" id="repeatPassword" required>
					<i>Repeat your password</i>
				</div>
				<!-- Error message for password -->
				<div id="passwordError" class="error-message d-none"></div>

				<div class="links">
					<a href="/signIn" data-link>Sign in</a>
					<button id="loginWith42" class="login-button">Login with 42</button>
				</div>

				<div class="inputBox">
					<!-- Added id="registerButton" for the event listener -->
					<input type="submit" id="registerButton" value="Sign up">
				</div>
			</div>
		</div>
		</div>
  `;

setTimeout(() => {



	//-----------------------------------------------------------------



	// Get form and button elements
	const registerButton = document.getElementById('registerButton');
	const usernameError = document.getElementById('usernameError');
	const emailError = document.getElementById('emailError');
	const passwordError = document.getElementById('passwordError');

	// Add click event listener to the register button
	registerButton.addEventListener('click', async function(event) {
    // Prevent default behavior
    event.preventDefault();

    // Hide any previous error messages
    usernameError.classList.add('d-none');
    usernameError.textContent = '';
    emailError.classList.add('d-none');
    emailError.textContent = '';
    passwordError.classList.add('d-none');
    passwordError.textContent = '';

    // Get form values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;

    // Basic validation
    if (password !== repeatPassword) {
      passwordError.textContent = 'Passwords do not match.';
      passwordError.classList.remove('d-none');
      return;
    }

    // Create the data object to send
    const formData = { username, email, password };

	const response = await apiFetch('https://localhost:4242/api/auth/register/', {
  	  method: 'POST',
      body: formData
    });

    // Handle the API response
    const result = await response.json();
    if (response.ok) {
		//Daniele Sua Maestà mi ha chiesto di fare un get di userprofile quindi eccotelo quà
		let userinfoid = await fetchUserInfo();
		userinfoid = userinfoid.id;
		await fetchUserProfileById(userinfoid);
		// Redirect to the login page on success
      history.pushState({}, '', '/home');
      router();
    } else {
      // Display any validation errors from the server
      if (result.username) {
        usernameError.textContent = result.username[0];
        usernameError.classList.remove('d-none');
      }
      if (result.email) {
        emailError.textContent = result.email[0];
        emailError.classList.remove('d-none');
      }
      if (result.password) {
        passwordError.textContent = result.password[0];
        passwordError.classList.remove('d-none');
      }
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

