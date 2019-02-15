(()=>{
	let apiLink = "";
	window.addEventListener("hashchange", checkRoute);
	checkRoute()


	async function checkRoute(){
		let data;
		let route = window.location.hash;
		switch (route) {
			case ("" && "/#") :
				apiLink = "https://api.github.com/repos/cmda-minor-web/web-app-from-scratch-1819/forks";
				data = await requestData(apiLink)
				renders.repos(data);
				break;
			default:
				apiLink = handleUser(route.split("#user/")[1]);
				data = await requestData(apiLink)
				renders.issues(data);
				break;
		}
	}
	function handleUser(route){
		const data = JSON.parse(localStorage.gitData);
		switch(route.split("/")[2]){
			case "open":
				return data[route.split("/")[1]].issues_url.slice(0, -9);
			case "closed":
				return data[route.split("/")[1]].issues_url.slice(0, -9) + "?state=closed";
		}
	}
})();

	function requestData(apiLink){
		let getData = new Promise(function(resolve, reject){
			const request = new XMLHttpRequest();
			request.open('GET', apiLink, true);

			request.onload = function () {
				if (request.status >= 200 && request.status < 400) {
			        const data = JSON.parse(request.responseText);
			        resolve(data);
				}
			}
			request.send();
		});
		return getData
	}

	const renders = {
		element: document.querySelector("main"),
		repos(data){
			let template = function(repo, i){
				return (`
					<article>
						<a class="link" href="#user/${repo.owner.login}/${i}/open">
							<h2> ${repo.name}</h2>
						 </a>
						 <p> User: ${repo.owner.login}</p>
						 <p> last commit: ${repo.updated_at} </p>
					 </article>
				 `)
			};

			this.element.innerHTML = "";
			data.forEach((repo,i) =>{
				let renderTemplate = template(repo,i);
				this.element.innerHTML += renderTemplate;
			})
		},
		issues(data){
			let template = function(repo, i){
				return (`
					<article>
						<a class="link" href="${repo.html_url}">
							<h2> ${repo.title}</h2>
						 </a>
						 <p> User: ${repo.user.login}</p>
						 <p> last commit: ${repo.created_at} </p>
					 </article>
				 `)
			};

			this.element.innerHTML = "";
			data.forEach((repo,i) =>{
				let renderTemplate = template(repo,i);
				this.element.innerHTML += renderTemplate;
			})
		}
	}
