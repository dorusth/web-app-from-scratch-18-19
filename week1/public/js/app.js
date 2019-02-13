(()=>{
		let getData = new Promise(function(resolve, reject){
			const request = new XMLHttpRequest();
			let apiLink = "https://api.github.com/repos/cmda-minor-web/web-app-from-scratch-1819/forks";
			request.open('GET', apiLink, true);

			request.onload = function () {
				if (request.status >= 200 && request.status < 400) {
			        const data = JSON.parse(request.responseText);
			        resolve(data);
				}
			}
			request.send();
		});

		getData.then(function(fromResolve) {
			renderData(fromResolve);
			localStorage.setItem('gitData', JSON.stringify(fromResolve));
		})
	}
)();

function renderData(data){
	const element = document.querySelector("main");
	let template = function(repo){
		return (`
		<article>
			<a href="${repo.html_url}">
				<h2> ${repo.name}</h2>
			 </a>
			 <p> User: ${repo.owner.login}</p>
		 </article>
		 `)
	};
	element.innerHTML = "";
	data.forEach(repo =>{
		var renderTemplate = template(repo);
		element.innerHTML += renderTemplate;
	})
}
