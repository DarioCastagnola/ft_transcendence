import { router } from "../main.js";

export default function register() {
  const html = `
    <section class="vh-100" style="background-color: #222831;">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12 col-xl-11">
            <div class="card text-black" style="border-radius: 25px;">
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                    <form id="registerForm" class="mx-1 mx-md-4">

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init class="form-outline flex-fill mb-0">
                          <input type="text" id="username" class="form-control" />
                          <label class="form-label" for="username">Your Username</label>
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init class="form-outline flex-fill mb-0">
                          <input type="email" id="email" class="form-control" />
                          <label class="form-label" for="email">Your Email</label>
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init class="form-outline flex-fill mb-0">
                          <input type="password" id="password" class="form-control" />
                          <label class="form-label" for="password">Password</label>
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init class="form-outline flex-fill mb-0">
                          <input type="password" id="repeatPassword" class="form-control" />
                          <label class="form-label" for="repeatPassword">Repeat your password</label>
                        </div>
                      </div>

                      <div class="form-check d-flex justify-content-center mb-5">
                        <input class="form-check-input me-2" type="checkbox" id="termsCheckbox" />
                        <label class="form-check-label" for="termsCheckbox">
                          I agree to all statements in <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button id="registerButton" type="button" class="btn btn-primary btn-lg">Register</button>
                      </div>

                    </form>

                  </div>
                  <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      class="img-fluid" alt="Sample image">
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
    // Inject the HTML into the page
    // document.body.innerHTML = html;

    // Get form and button elements
    const form = document.getElementById('registerForm');
    const registerButton = document.getElementById('registerButton');

    // Add click event listener to the register button
    registerButton.addEventListener('click', async function(event) {
      // Prevent default behavior (like page refresh)
      event.preventDefault();

      // Get form values
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const repeatPassword = document.getElementById('repeatPassword').value;
      const termsChecked = document.getElementById('termsCheckbox').checked;

      // Basic validation
      if (!termsChecked) {
        alert('You must agree to the terms of service.');
        return;
      }
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
      console.log(JSON.stringify(formData))
      try {
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
          // alert('Registration successful!');
          console.log('Registration result:', result);
          // Redirect to another page or handle success
          history.pushState({}, '', '/login');
          router();
        } else {
          alert(`Registration failed: ${result.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration.');
      }
    });
  }, 0);

  return html;
}

