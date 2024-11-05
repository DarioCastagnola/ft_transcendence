import { router } from "../main.js";

export default function register() {
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
					<div class="inputBox">
						<input type="email" id="email" required>
						<i>Email</i>
					</div>
					<div class="inputBox">
						<input type="password" id="password" required>
						<i>Password</i>
					</div>
          <div class="inputBox">
						<input type="password" id="repeatPassword" required>
						<i>Reapet your password</i>
					</div>
					<div class="links">
						<a href="/signIn" data-link>Sign in</a>
					</div>
					<div class="inputBox">
						<input type="submit" onclick="submitForm()" value="Sign up">
					</div>
				</div>
			</div>
		</div>

	</section>
  `;

  setTimeout(() => {

      // Get form and button elements
      const form = document.getElementById('registerForm');
      const registerButton = document.getElementById('registerButton');
      const usernameError = document.getElementById('usernameError');
      const emailError = document.getElementById('emailError');
      const passwordError = document.getElementById('passwordError');

      // Add click event listener to the register button
      registerButton.addEventListener('click', async function(event) {

        // Prevent default behavior (like page refresh)
      event.preventDefault();

      // Hide any previous error message
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
        alert('Passwords do not match.');
        return;
      }

      // Create the data object to send
      const formData = {
        username,
        email,
        password
      };

      // Send the form data to the API using fetch
      // console.log(JSON.stringify(formData))
      const response = await fetch('http://localhost:8002/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Handle the API response
      const result = await response.json();
      if (response.ok) {
        // Redirect to another page or handle success
        history.pushState({}, '', '/login');
        router();
      } else {
        if (result.username && result.username.length > 0) {
            usernameError.textContent = result.username[0];
            usernameError.classList.remove('d-none');
        }
        if (result.email && result.email.length > 0) {
            emailError.textContent = result.email[0];
            emailError.classList.remove('d-none');
        }
        if (result.password && result.password.length > 0) {
            passwordError.textContent = result.password[0];
            passwordError.classList.remove('d-none');
        }
      }
    });
  }, 0);

  return html;
}

