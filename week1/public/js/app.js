'use strict'

var element = document.querySelector("main");
var form = document.querySelector("form");
var user = "wesbos"
var request = new XMLHttpRequest();


function getData(){
	var apiLink = "https://api.github.com/users/"+user+"/repos";
	request.open('GET', apiLink, true);

	request.onload = function () {
		var data =  JSON.parse(this.response);
		element.innerHTML = "";
		localStorage.setItem('gitData', JSON.stringify(data));
		data.forEach(repo =>{
			var template =`
			<article>
				<a href="${repo.html_url}">
					<h2> ${repo.name}</h2>
				 </a>
				 <p>${repo.description}</p>
			 </article>
			`;
			element.innerHTML += template;
		})
	}

	request.send();
}

form.addEventListener("submit", (event)=>{
	event.preventDefault();
	user = form.querySelector("input[type=text]").value;
	getData();
})

getData();
