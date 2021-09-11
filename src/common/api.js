import axios from 'axios';

class Api {
	constructor() {
		this.baseURL = process.env.NODE_ENV === 'production'
			? '//bbs-server.herokuapp.com' // 배포용
			: '//localhost:8080'; // 개발용
	}

 	requestBase({ method, url, params, data }) {
		return axios({
			method,
			url,
			baseURL: this.baseURL,
			params,
			data,
			withCredentials: true,
			headers: {
				post: {
					'Content-Type': 'multipart/form-data',
				},
			},
			timeout: 8000,
		}).then(({ data }) => data)
			.catch(err => Promise.reject(err));
	}
	
	async requestGet(url, params = {}) {
		return await this.requestBase({
			method: 'get',
			url,
			params,
		});
	}
	
	async requestPost(url, data) {
		return await this.requestBase({
			method: 'post',
			url,
			data,
		});
	}
	
	async requestPut(url, data) {
		return await this.requestBase({
			method: 'put',
			url,
			data,
		});
	}
	
	async requestDelete(url, data) {
		return await this.requestBase({
			method: 'delete',
			url,
			data,
		});
	}
}

export default Api;