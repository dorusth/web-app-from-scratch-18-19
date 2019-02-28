const renders = {
	element: document.querySelector("main"),
	repos(data){
		let template = data.map((repo, i)=>{
			return (`
				<article>
					<div>
						<a class="link" href="#user/${repo.owner.login}/${i}/open">
							<h2> ${repo.owner.login}</h2>
						 </a>
						 <p> Repo name: ${repo.name}</p>
						 <p> Open issues: ${repo.open_issues_count} </p>
					</div>
					<img src="${repo.owner.avatar_url}">
				 </article>
			 `)
		})
		this.element.innerHTML = template.join('');
	},
	issues(data){
		function mapIssues(issue){
			return(`
				<article class="issue">
					<div>
						<a class="link" target="_blank" href="${issue.html_url}">
							<h2> ${issue.title}</h2>
						 </a>
						 <p> User: ${issue.user.login}</p>
						 <p> last commit: ${issue.created_at} </p><p>${issue.state}</p>
					</div>
				 </article>
			 `)
		}
		if(data.open.length > 0){
			this.element.innerHTML = `<h3>Open issues</h3>`;
			this.element.innerHTML += data.open.map(mapIssues).join('');
		}else{
			this.element.innerHTML = `<h3>there are no open issues 👍</h3>`;
		}

		if(data.closed.length > 0){
			this.element.innerHTML += `<h3>closed issues</h3>`;
			this.element.innerHTML += data.closed.map(mapIssues).join('');
		}else{
			this.element.innerHTML += `<h3>there are no closed issues 👍</h3>`;
		}
	},
	loading(){
		this.element.innerHTML = `
			<div class="spinner">
			  <div class="double-bounce1"></div>
			  <div class="double-bounce2"></div>
			</div>
		`
	},
	error(error){
		console.log(error);
		this.element.innerHTML = `
			<article class="error">
				<h2>😢Something seems to have gone wrong😢</h2>
				<p>${error}</p>
				<a href="">return to the forks page</a>
			</article>
		`
	}
}

export default renders;
