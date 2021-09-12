import Api from "./api";

export default class Post extends Api {
	// eslint-disable-next-line
	constructor() {
		super();
	}

	async getList(params) {
		return await this.requestGet('/post/list', params);
	}
	
	async getPost(params) {
		return await this.requestGet('/post', params);
	}

	async addPost(params) {
		return await this.requestPost('/post', params);
	}

	async updatePost(params) {
		return await this.requestPut('/post', params);
	}

	async deletePost(params) {
		return await this.requestDelete('/post', params);
	}

}