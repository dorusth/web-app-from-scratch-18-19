function requestData(routeData){
	return new Promise(function(resolve, reject){
		const request = new XMLHttpRequest();

		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				const data = JSON.parse(request.responseText);
				resolve(data);
			}else{
				console.log("error");
			}
		}
		request.open('GET', routeData, true);
		request.send();
	});
}

export default requestData;
