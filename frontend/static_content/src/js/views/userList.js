import { router } from "../main.js";
import { apiFetch, fetchUsers, getSelfUser } from "../service/apiService.js";

export default function userList() {
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
			<div class="card-container">
				<!-- CARD GENERATE DALLO SCRIPT -->
			</div>
		</div>

	</section>
    `;


	setTimeout(() => {

		async function checkOnline(user_id) {
			try {
				const apiUrl = `https://localhost:4242/api/core/is-online/${user_id}/`
				const response = await apiFetch(apiUrl);
		
				if (!response.ok) {
					throw new Error(`Failed to fetch online status for user ${user_id}`);
				}
		
				const data = await response.json();
				return data.is_online;
			} catch (error) {
				console.error('Error checking online status:', error);
				return false; // Default to offline in case of error
			}
		}

		async function removeFriend(friend_id) {
			try {
				const apiUrl = `https://localhost:4242/api/core/remove-friend/`; // Replace with your API endpoint
				const payload = {
					"friend_id": friend_id,
				};
				const response = await apiFetch(apiUrl, {
					method: 'POST',
					body: JSON.stringify(payload), // Assuming the API expects a JSON body with `user_id`
				});
		
				if (!response.ok) {
					throw new Error(`Failed to remove friend with ID ${user_id}`);
				}
		
				const data = await response.json();
				console.log(`Friend removed successfully: ${data}`);
				return true; // Indicate success
			} catch (error) {
				console.error('Error removing friend:', error);
				return false; // Indicate failure
			}
		}

		async function addFriend(friend_id) {
			try {
				const apiUrl = `https://localhost:4242/api/core/add-friend/`; // Replace with your API endpoint
				const payload = {
					"friend_id": friend_id,
				};
				const response = await apiFetch(apiUrl, {
					method: 'POST',
					body: JSON.stringify(payload), // Assuming the API expects a JSON body with `user_id`
				});
		
				if (!response.ok) {
					throw new Error(`Failed to add friend with ID ${user_id}`);
				}
		
				const data = await response.json();
				console.log(`Friend added successfully: ${data}`);
				return true; // Indicate success
			} catch (error) {
				console.error('Error adding friend:', error);
				return false; // Indicate failure
			}
		}

	async function getFriends() {
		try {
			const own_info = await getSelfUser();
			return own_info.friends || []; // Return the array of friends
		} catch (error) {
			console.error('Error fetching friends:', error);
			return []; // Default to an empty array in case of error
		}
	}
	
	async function getUsers() {
		try {
			const friends = await getFriends(); // Get the friend list
			const users = await fetchUsers();
			const container = document.querySelector('.card-container');
			const cards = [];
	
			// Check online status for all users concurrently
			const onlineStatuses = await Promise.all(users.map(user => checkOnline(user.id)));
	
			users.forEach((user, index) => {
				const is_online = onlineStatuses[index];
				const is_friend = friends.includes(user.id); // Check if the user is already a friend
				const cardHTML = `
					<div class="cardMatch">
						<div data-status="inprogress" class="teams">
							<div class="team-info team-home" style="background-color: ${is_online ? 'green' : 'red'};"></div>
							<p class="team-name-info">${user.username}</p>
							<div class="cardMatch inner-card" data-user-id="${user.id}" style="background-color: ${is_friend ? 'blue' : ''};"></div>
							<p class="friend-label" style="display: ${is_friend ? 'inline' : 'none'};">amico</p>
						</div>
					</div>
				`;
				cards.push(cardHTML);
			});
	
			// Append all cards at once for better performance
			container.innerHTML = cards.join('');
	
			// Enable scrolling if there are more than 5 cards
			if (users.length > 5) {
				container.style.overflowY = 'auto';
			}
	
			container.querySelectorAll('.inner-card').forEach(card => {
				card.addEventListener('click', async function () {
					const userId = this.getAttribute('data-user-id');
					const isFriend = friends.includes(Number(userId)); // Check if the user is a friend
					const friendLabel = this.nextElementSibling;
	
					if (isFriend) {
						const success = await removeFriend(Number(userId)); // Unfriend the user
						if (success) {
							this.style.backgroundColor = ''; // Reset color
							friendLabel.style.display = 'none';
							friends.splice(friends.indexOf(Number(userId)), 1); // Update the local friends array
						}
					} else {
						const success = await addFriend(Number(userId)); // Add the user as a friend
						if (success) {
							this.style.backgroundColor = 'blue';
							friendLabel.style.display = 'inline';
							friends.push(Number(userId)); // Update the local friends array
						}
					}
				});
			});
			
			// Attach click events to usernames
			container.querySelectorAll('.team-name-info').forEach(nameElement => {
				nameElement.addEventListener('click', function () {
					const userId = this.parentElement.querySelector('.inner-card').getAttribute('data-user-id');
					// Save the clicked user's ID in session storage
					sessionStorage.setItem('clickedUserId', userId);
					history.pushState({}, '', '/extUserInfo');
					router();
					console.log(`User ID ${userId} saved to session storage`);
				});
			});

		} catch (error) {
			console.error('Error fetching users:', error);
		}
	}
	
	// Initial function calls
	getFriends();
	getUsers();
	}, 0);
	
	
	return html;
}
    
	
