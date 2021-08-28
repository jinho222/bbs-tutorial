import Api from "./api";

class Post extends Api {
	// eslint-disable-next-line
	constructor() {
		super();
	}

	async getList(params) {
		return await this.requestGet('/post/list', params);
	}
}

export default Post;