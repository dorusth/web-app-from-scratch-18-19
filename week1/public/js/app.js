const 	element = document.querySelector("main"),
		form = document.querySelector("form");
let 	user = localStorage.name || "cmda-minor-web";

(()=>{
	function requestData(){
		var getData = new Promise(function(resolve, reject){
			const request = new XMLHttpRequest();
			let apiLink = "https://api.github.com/users/"+user+"/repos";
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
	form.addEventListener("submit", userChange);
	function userChange(){
		event.preventDefault();
		user = form.querySelector("input[type=text]").value;
		localStorage.name = form.querySelector("input[type=text]").value;
		requestData();
	}
	requestData();
})();

function renderData(data){
	let template = function(repo){
		return (`
		<article>
			<a href="${repo.html_url}">
				<h2> ${repo.name}</h2>
			 </a>
			 <p>${repo.description}</p>
		 </article>
		 `)
	};
	element.innerHTML = "";
	data.forEach(repo =>{
		var renderTemplate = template(repo);
		element.innerHTML += renderTemplate;
	})
}
