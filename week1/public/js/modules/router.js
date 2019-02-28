function checkRoute(){
	let route = window.location.hash;
	switch (route) {
		case ("") :
			return {
				link: "https://api.github.com/repos/cmda-minor-web/web-app-from-scratch-1819/forks?per_page=50",
				user:false
			};
			break;
		default:
			if(route.split("/")[0] === "#user"){
				return {
					//uit de lokale data wordt op basis van de key in de url de nieuwe apilink opgehaald
					link: JSON.parse(localStorage.gitData)[route.split("#user/")[1].split("/")[1]].issues_url.slice(0, -9),
					link_closed: JSON.parse(localStorage.gitData)[route.split("#user/")[1].split("/")[1]].issues_url.slice(0, -9) + "?state=closed",
					user: true,
					userName: route.split("#user/")[1].split("/")[0]
				}
			}else{
				return {
					link: undefined,
					user: undefined
				}
			}
	}
}

export default checkRoute;
