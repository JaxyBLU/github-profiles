const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const APIURL = 'https://api.github.com/users/';


/*============================== Loading initially =====================================================*/
getUserProfile('florinpop17');


/*============================== Function for getting user details by the username =====================*/
async function getUserProfile(user){
	const resp = await fetch(APIURL + user);

	const respData = await resp.json();
	
	createUserCard(respData);

	getRepos(user);
}

/*================================ Function for getting the repos ======================================*/
async function getRepos(username){
	const resp = await fetch(APIURL + username + "/repos");

	const respData = await resp.json();
	console.log(respData);
	addReposToCard(respData);
}

/*=============================== Function for adding repos to the card ================================*/
function addReposToCard(repodata){
	const reposEl = document.getElementById('repos');

	repodata
	.sort((a,b) => b.stargazers_count - a.stargazers_count)
	.slice(0, 10)
	.forEach((repodata1)=>{
		const repoEl = document.createElement('a');
	
		repoEl.classList.add('repo');
		repoEl.href = repodata1.html_url;
		repoEl.target = '_blank';
		repoEl.innerText = repodata1.name;

		reposEl.appendChild(repoEl);
	})
}

/*=============================== Function for creating card of the user ===============================*/
function createUserCard(user){
	const userHTML = `
		<div class="card">
			<div>
				<img src="${user.avatar_url}""
					alt="${user.name}"
					class="avatar"
				/>
			</div>
			<div class="user-details">
				<h2>${user.name}</h2>
				<p>${user.bio}</p>

				<ul>
					<li>${user.followers}<strong>Followers</strong></li>
					<li>${user.following}<strong>Following</strong></li>
					<li>${user.public_repos}<strong>Repos</strong></li>
				</ul>

				<div id="repos"></div>
			</div>
		</div>
	`;

	main.innerHTML = userHTML;
}

/*=============================== Event Listener for when the form is submitted ========================*/
form.addEventListener('submit', (e)=>{
	e.preventDefault();

	const username = search.value;
	console.log(search.value);
	search.value = '';

	if(username){
		getUserProfile(username);
	}
})