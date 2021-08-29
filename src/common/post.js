import Api from "./api";

class Post extends Api {
	// eslint-disable-next-line
	constructor() {
		super();
	}

	async getList(params) {
		return await this.requestGet('/post/list', params);
	}
	
	async addPost(params) {
		return await this.requestPost('/post/add', params);
	}
}

export default Post;