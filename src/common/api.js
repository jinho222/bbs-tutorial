import axios from 'axios';

axios.defaults.baseURL = '//127.0.0.1:8080';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

class Api {
 	requestBase(method, url, params) {
		return axios({
			method: method,
			url: url,
			data: params,
		}).then(({ data }) => data)
			.catch(err => Promise.reject(err));
	}
	
	async requestGet(url, params) {
		return await this.requestBase('get', url, params);
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