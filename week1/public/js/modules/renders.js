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
					 <p> Open issues: ${repo.open_issues_count} </p>
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
					 <p> last commit: ${repo.created_at} </p><p>${repo.state}</p>
				 </article>
			 `)
		};

		this.element.innerHTML = "<h3>Open issues</h3>";

		data.open.forEach((repo,i) =>{
			let renderTemplate = template(repo,i);
			this.element.innerHTML += renderTemplate;
		})

		this.element.innerHTML += "<h3>closed issues</h3>";

		data.closed.forEach((repo,i) =>{
			let renderTemplate = template(repo,i);
			this.element.innerHTML += renderTemplate;
		})
	}
}

export default renders;
