'use strict'
import checkRoute from "./modules/router.js";
import requestData from "./modules/request.js";
import renders from "./modules/renders.js";

(function () {
	window.addEventListener("hashchange", init);

	function init(){
		let routeData = checkRoute();
		if (routeData.user === true){
			let userRenderData = {};
			const openRequest = requestData(routeData.link).then(data => {userRenderData.open = data})
			const closedRequest = requestData(routeData.link_closed).then(data => {userRenderData.closed = data})
			Promise.all([openRequest,closedRequest]).then(data => renders.issues(userRenderData))
		}
		else if(routeData.user === false){
			requestData(routeData.link).then(data =>{
				renders.repos(data);
			});
		}
	}
	init()
})();
