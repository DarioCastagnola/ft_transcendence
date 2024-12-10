import { router } from "../main.js"

export async function apiFetch(url, options = {}) {
  // Set the default credentials option to include cookies
  options.credentials = 'include';

  // Set headers if not already provided
  options.headers = options.headers || {};

  // Check if body is FormData
  const isFormData = options.body instanceof FormData;

  // Only set Content-Type if not FormData (browser sets it for FormData automatically)
  if (!isFormData) {
    options.headers['Content-Type'] = 'application/json';
  }

  // If the body exists and is not FormData or a string, stringify it
  if (options.body && !isFormData && typeof options.body !== 'string') {
    options.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, options);

  // Redirect to login if the status is unauthorized
  if (response.status === 401) {
    window.history.pushState({}, '', '/signIn');
    router();
    return;
  }

  return response;
}

export async function fetchUserInfo() {
  const apiUrl = 'https://localhost/api/auth/user-info/';
  const response = await apiFetch(apiUrl);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.error("Failed to fetch user info", response.status);
  }
}

export async function getTournamentId() {
  const apiUrl = 'https://localhost/api/game/tournaments/open/';
  const response = await apiFetch(apiUrl);

  if (response.ok) {
    const data = await response.json();
    console.log(data[0].id);
    return data[0].id;
  } else {
    return -1;
  }

}

export async function fetchUserProfileById(user_id) {
  const apiUrl =  `https://localhost/api/core/user-profile/${user_id}/`
  const response = await apiFetch(apiUrl);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.error("Failed to fetch user profile by id", response.status);
  }
}

// export async function fetchMatchHistory() {
//   const apiUrl =  'https://localhost/api/game/matches/history/';
//   const response = await apiFetch(apiUrl);

//   if (response.ok) {
//     const data = await response.json();
//     return data;
//   } else {
//     console.error("Failed to fetch match history", response.status);
//   }
// }
