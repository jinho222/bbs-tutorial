import { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {	
	const history = useHistory();

	/* status */
	const [form, setForm] = useState({
		id: '',
		pw: '',
		pwRe: '',
		name: '',
		tel: '',
	});
	const [isShowAlert, setIsShowAlert] = useState(false);
	const invalidForm = useMemo(() => {
		const res = {
			status: false,
			msg: '',
		}

		const { id, pw, pwRe, name, tel } = form;

		if (!id) {
			res.status = false;
			res.msg = '아이디를 입력해주세요.';
		} else if (!pw) {
			res.status = false;
			res.msg = '비밀번호를 입력해주세요.';
		} else if (!pwRe) {
			res.status = false;
			res.msg = '비밀번호 재확인을 입력해주세요.';
		} else if (!name) {
			res.status = false;
			res.msg = '이름을 입력해주세요.';
		} else if (!tel) {
			res.status = false;
			res.msg = '연락처를 입력해주세요.';
		} else {
			res.status = true;
			res.msg = '';
		}

		return res;
	}, [form]);

	/* method */
	const onFormChange = e => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	}

	const signupSubmit = () => {
		if (!invalidForm.status) {
			setIsShowAlert(true);
			return;
		}

		history.push('/');
	};

	return (
		<>
			<div className="card">
				<div className="card-header">
					<h2>회원가입</h2>
				</div>
				<div className="card-body">
					<div className="mb-3">
						<label htmlFor="id" className="form-label">아이디</label>
						<input
						type="text"
						className="form-control"
						id="id"
						placeholder="아이디를 입력하세요."
						name="id"
						value={form.id}
						onChange={onFormChange}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="pw" className="form-label">비밀번호</label>
						<input
						type="password"
						className="form-control"
						id="pw"
						placeholder="비밀번호를 입력하세요."
						name="pw"
						value={form.pw}
						onChange={onFormChange}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="pwRe" className="form-label">비밀번호 재확인</label>
						<input
						type="password"
						className="form-control"
						id="pwRe"
						placeholder="비밀번호를 다시 입력해주세요."
						name="pwRe"
						value={form.pwRe}
						onChange={onFormChange}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="name" className="form-label">이름</label>
						<input
						type="text"
						className="form-control"
						id="name"
						placeholder="이름을 입력하세요."
						name="name"
						value={form.name}
						onChange={onFormChange}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="tel" className="form-label">연락처</label>
						<input
						type="text"
						className="form-control"
						id="tel"
						placeholder="연락처를 입력하세요."
						name="tel"
						value={form.tel}
						onChange={onFormChange}
						/>
					</div>
					{
						isShowAlert && 
						<div className="alert alert-danger mt-4">
							{invalidForm.msg}
						</div>
					}
				</div>
			<button
			className="btn btn-primary d-block mx-auto"
			onClick={signupSubmit}
			>회원가입</button>
			</div>
		</>
	);
}

export default Signup;