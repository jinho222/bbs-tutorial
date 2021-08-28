import Api from "./api";

class Member extends Api {
	// eslint-disable-next-line
	constructor() {
		super();
	}

	async signup(params) {
		return await this.requestPost('/member/signup', params);
	}

	async login(params) {
		return await this.requestPost('/member/login', params);
	}
}

export default Member;	