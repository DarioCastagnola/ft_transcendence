import { router } from "../main.js"

// Function to get the current access token
function getAccessToken() {
  return localStorage.getItem("access");
}

// Function to get the current refresh token
function getRefreshToken() {
  return localStorage.getItem("refresh");
}

// Function to set tokens
function setTokens(accessToken, refreshToken) {
  localStorage.setItem("access", accessToken);
  localStorage.setItem("refresh", refreshToken);
}

// Function to refresh the access token
async function refreshAccessToken() {
  const refreshUrl = 'http://localhost:8002/api/auth/token/refresh/';

  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(refreshUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refresh: refreshToken })
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  const { access, refresh } = data;
  setTokens(access, refresh);  // Update tokens
  return access;
}

// Helper function to make API calls with auto-refresh
export async function apiFetch(url, options = {}) {
  // Add the access token to the headers
  options.headers = options.headers || {};
  options.headers['Authorization'] = `Bearer ${getAccessToken()}`;
  options.headers['Content-Type'] = 'application/json';

  let response = await fetch(url, options);

  // If the access token is expired, try to refresh it
  if (response.status === 401) {
    try {
      const newAccessToken = await refreshAccessToken();
      options.headers['Authorization'] = `Bearer ${newAccessToken}`;
      response = await fetch(url, options); // Retry the original request with new token
    } catch (refreshError) {
      console.error("Failed to refresh token", refreshError);
      window.history.pushState({}, '', '/login');
      router();
      return;
    }
  }

  return response;
}
