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
  const apiUrl = 'https://localhost:4242/api/auth/user-info/';
  const response = await apiFetch(apiUrl);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.error("Failed to fetch user info", response.status);
  }
}

export async function getTournamentId() {
  const apiUrl = 'https://localhost:4242/api/game/tournaments/open/';
  const response = await apiFetch(apiUrl);

  if (response.ok) {
    const data = await response.json();
   // console.log(data[0].id);
    return data[0].id;
  } else {
    return -1;
  }

}

export async function fetchUserProfileById(user_id) {
  const apiUrl =  `https://localhost:4242/api/core/user-profile/${user_id}/`
  const response = await apiFetch(apiUrl);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.error("Failed to fetch user profile by id", response.status);
  }
}

export async function fetchMatchHistory() {
  const apiUrl =  'https://localhost:4242/api/game/matches/history/';
  const response = await apiFetch(apiUrl);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.error("Failed to fetch match history", response.status);
  }
}


export async function fetchUsernamebyId(user_id) {
  const apiUrl = 'https://localhost:4242/api/auth/users/';
  const response = await apiFetch(apiUrl);
  if (response.ok) {
    const data = await response.json();

    const user = data.find(user => user.id === user_id);
    if (user) {
      return user.username;
    } else {
      console.error(`User with id ${user_id} not found`);
      return null;
    }
  } else {
    console.error("Failed to fetch user's username", response.status);
    return null;
  }
}

export async function fetchUsers() {
  const apiUrl = 'https://localhost:4242/api/auth/users/';
  const response = await apiFetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch nickname", response.status);
    }
}

export async function fetchNicknameByPlayerId(player_id) {
  const apiUrl =  `https://localhost:4242/api/game/players/${player_id}/`;
  const response = await apiFetch(apiUrl);

  if (response.ok) {
    const data = await response.json();
    return data.nickname;
  } else {
    console.error("Failed to fetch nickname", response.status);
  }
}

export async function updateLastSeen() {
  //console.log("I work!");
  try {
    const apiUrl = "https://localhost:4242/api/core/update-last-seen/";
      const response = await apiFetch(apiUrl, {
          method: 'POST',
          },);

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log('Last seen updated successfully');
  } catch (error) {
      console.error('Error updating last seen:', error);
  }
}

export async function getSelfUser() {
  let userInfo = await fetchUserInfo();
	let user_id = userInfo.id;
  let your_info = await fetchUserProfileById(user_id);
  return your_info;
}

export async function getStats(id) {
  const apiUrl = `https://localhost:4242/api/game/stats/${id}/`;
  const response = await apiFetch(apiUrl);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.error("Failed to fetch game stats", response.status);
  }
}

export async function fetchSelfPlayerID() {
  const apiUrl = `https://localhost:4242/api/game/matches/history/`;
  const response = await apiFetch(apiUrl);

  if (response.ok) {
    let data = await response.json();
    data = data[0].player1;
    return data;
  } else {
    console.error("Failed to fetch game stats", response.status);
  }
}