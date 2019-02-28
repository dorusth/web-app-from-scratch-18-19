import requestData from "./request.js";
import renders from "./renders.js";
import checkRoute from "./router.js";

window.addEventListener("hashchange", ()=>{handleRoute(checkRoute())});

function handleRoute(routeData){
	if (routeData.user === true){
		renders.loading();
		let userRenderData = {};
		const openRequest = requestData(routeData.link).then(data => {userRenderData.open = data})
		const closedRequest = requestData(routeData.link_closed).then(data => {userRenderData.closed = data})
		Promise.all([openRequest,closedRequest]).then(data => renders.issues(userRenderData))
	}
	else if(routeData.user === false){
		renders.loading();
		requestData(routeData.link).then(data =>{
			localStorage.setItem('gitData', JSON.stringify(data));
			renders.repos(data);
		}, reject => {renders.error("Error code: " + reject)});
	}
	else{
		renders.error("This link doesn't seem to exist");
	}
}

export default handleRoute;
