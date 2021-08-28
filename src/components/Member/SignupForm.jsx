import { useState } from "react";
import Alert from '../Common/Alert';

export default function SignupForm({ signupSubmit }) {
	/* status */
	const [form, setForm] = useState({
		id: '',
		pw: '',
		pwRe: '',
		name: '',
		tel: '',
	});
	const [errorMsg, setErrorMsg] = useState('');

	/* method */
	const onFormChange = e => {
		const { name, value } = e.target;

		let res = value;
		if (['id', 'pw', 'pwRe'].includes(name)) {
			// 아이디, 비밀번호에 한글 입력 불가
			res = value.replace(/[^a-zA-Z0-9]/g, ''); 
		} else if (name === 'tel') {
			// 연락처에 숫자 제외 입력 불가
			res = value.replace(/[^\d]/g, '');
		}

		setForm({
			...form,
			[name]: res,
		});
	};

	const onFormSubmit = () => {
			const { id, pw, pwRe, name, tel } = form;
			if (!id) {
				setErrorMsg('아이디를 입력해주세요.');
			} else if (!pw || pw.length < 4) {
				setErrorMsg('비밀번호를 4자 이상 입력해주세요.');
			} else if (!pwRe) {
				setErrorMsg('비밀번호 재확인을 입력해주세요.');
			} else if (pw !== pwRe) {
				setErrorMsg('비밀번호가 일치하지 않습니다.');
			} else if (!name) {
				setErrorMsg('이름을 입력해주세요.');
			}	else if (!tel) {
				setErrorMsg('연락처를 입력해주세요.');
			} else if (!/^\d{9,11}$/.test(tel)) {
				setErrorMsg('유효한 연락처 형식이 아닙니다.');
			} else {
				setErrorMsg('');
				signupSubmit(form);
			}
	};

	/* template */
	return (
		<>
			{
				(errorMsg.length > 0) &&
				<Alert msg={errorMsg}></Alert>
			}
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
				placeholder="-를 제외하고 입력해주세요."
				name="tel"
				value={form.tel}
				onChange={onFormChange}
				/>
			</div>
			<button
			className="btn btn-primary d-block mx-auto"
			onClick={onFormSubmit}
			>회원가입</button>
		</>
	)
}