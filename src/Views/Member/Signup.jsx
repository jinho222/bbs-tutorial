import { useState } from "react";

const Signup = () => {	
	const [form, setForm] = useState({
		id: '',
		pw: '',
		pwRe: '',
		nickname: '',
		tel: '',
	});
	const [invalidMsg, setinvalidMsg] = useState('');

	const onFormChange = e => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	}

	const signupSubmit = () => {
		if (!form.id) {
			setinvalidMsg('아이디를 입력해주세요');
			return;
		} else if (!form.pw) {
			setinvalidMsg('비밀번호를 입력해주세요');
			return;
		} else {
			// history.push('/');
		}
	};

	return (
		<div className="container pt-4">
			<div className="card">
				<div className="card-header">
					<h2 className="mb-0">회원가입</h2>
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
						className="form-control"
						id="pwRe"
						placeholder="비밀번호를 다시 입력해주세요."
						name="pwRe"
						value={form.pwRe}
						onChange={onFormChange}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="nickname" className="form-label">닉네임</label>
						<input
						className="form-control"
						id="nickname"
						placeholder="닉네임을 입력하세요."
						name="nickname"
						value={form.nickname}
						onChange={onFormChange}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="tel" className="form-label">연락처</label>
						<input
						className="form-control"
						id="tel"
						placeholder="연락처를 입력하세요."
						name="tel"
						value={form.tel}
						onChange={onFormChange}
						/>
					</div>
					{
						invalidMsg && 
						<div className="alert alert-danger mt-4">
							{invalidMsg}
						</div>
					}
				</div>
			<button
			className="btn btn-primary d-block mx-auto"
			onClick={signupSubmit}
			>회원가입</button>
			</div>
		</div>
	);
}

export default Signup;