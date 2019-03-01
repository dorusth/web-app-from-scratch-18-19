function requestData(routeData){
	return new Promise((resolve, reject) =>{
		const request = new XMLHttpRequest();

		request.onload = () => {
			if (request.status >= 200 && request.status < 400) {
				const data = JSON.parse(request.responseText);
				resolve(data);
			}else{
				reject(request.status);
			}
		}
		request.open('GET', routeData, true);
		request.send();
	});
}

export default requestData;
