import axios from 'axios';

axios.defaults.baseURL = '//127.0.0.1:8080';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

class Api {
 	requestBase(method, url, params) {
		return axios({
			method,
			url,
			data: params,
		}).then(({ data }) => data)
			.catch(err => Promise.reject(err));
	}
	
	async requestGet(url, params = {}) {
		const paramsString = new URLSearchParams(params).toString();
		const fullUrl = `${url}?${paramsString}`;
		return await this.requestBase('get', fullUrl);
	}
	
	async requestPost(url, params) {
		return await this.requestBase('post', url, params);	
	}
	
	async requestPut(url, params) {
		return await this.requestBase('put', url, params);
	}
	
	async requestDelete(url, params) {
		return await this.requestBase('delete', url, params);
	}
}

export default Api;