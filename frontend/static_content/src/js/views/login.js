import { router } from "../main.js";

export default function login() {
  const html = `
  <section class="h-100 gradient-form" style="background-color: #222831;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">

                  <div class="text-center">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                      style="width: 185px;" alt="logo">
                    <h4 class="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                  </div>

                  <form id="loginForm">
                    <p>Please login to your account</p>

                    <div data-mdb-input-init class="form-outline mb-4">
                      <input type="username" id="username" class="form-control"
                        placeholder="Username" required />
                      <label class="form-label" for="username">Username</label>
                    </div>

                    <div data-mdb-input-init class="form-outline mb-4">
                      <input type="password" id="password" class="form-control"
                        placeholder="Password" required />
                      <label class="form-label" for="password">Password</label>
                    </div>


                    <div id="errorMessage" class="alert alert-danger d-none" role="alert"></div>

                    <div class="text-center pt-1 mb-5 pb-1">
                      <button id="loginButton" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button">Log in</button>
                      <a class="text-muted" href="#!">Forgot password?</a>
                    </div>

                    <div class="d-flex align-items-center justify-content-center pb-4">
                      <p class="mb-0 me-2">Don't have an account?</p>
                      <a href="/register" data-link class="btn btn-outline-danger" data-mdb-button-init data-mdb-ripple-init>Create new</a>
                    </div>

                  </form>

                  <button id="loginWith42" class="login-button">Login with 42</button>

                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 class="mb-4">We are more than just a company</h4>
                  <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      const response = await fetch('http://localhost/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      // Handle the API response
      const result = await response.json();
      if (response.ok) {
        // alert('Login successful!');
        console.log('Login result:', result);
        // Redirect to another page or handle success
        if (result.access) {
          localStorage.setItem("access", result.access)
          localStorage.setItem("refresh", result.refresh)
          window.history.pushState({}, '', '/home');
          router();
        } else {
          localStorage.setItem("username", username)
          window.history.pushState({}, '', '/2FA');
          router();
        }
      } else {
        alert(`Login failed: ${result.message}`);
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

