import requestData from "./request.js";
import renders from "./renders.js";
import checkRoute from "./router.js";

window.addEventListener("hashchange", ()=>{handler(checkRoute())});

function handler(routeData){
	renders.loading();
	if (routeData.user === true){
		//if the route contains a user the app gets the issues for that user and renders it in a details page
		let userRenderData = {};
		const openRequest = requestData(routeData.link).then(data => {userRenderData.open = data})
		const closedRequest = requestData(routeData.link_closed).then(data => {userRenderData.closed = data})
		Promise.all([openRequest,closedRequest]).then(data => renders.issues(userRenderData))
	}
	else if(routeData.user === false){
		//if the route doesn't contain a user the app renders the main page with all the forks
		requestData(routeData.link).then(data =>{
			localStorage.setItem('gitData', JSON.stringify(data));
			renders.repos(data);
		}, reject => {renders.error("Error code: " + reject)});
	}
	else{
		//if the user value is undefined the app renders an error page with the option to return to the main page
		renders.error("This link doesn't seem to exist");
	}
}

export default handler;
