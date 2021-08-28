import { useState } from "react"

export default function LoginForm({ loginSubmit }) {
	const [form, setForm] = useState({
		id: '',
		pw: '',
	})
	
	const [isPwSecret, setIsPwSecret] = useState(true);

	const onFormChange = e => {
		const { name, value } = e.target;

		setForm({
			...form,
			[name]: value,
		});
	};

	const onFormSubmit = () => {
		loginSubmit(form);
	}

	return (
		<>
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
				<div className="position-relative">
					<input
					type={isPwSecret ? "password" : "text"}
					className="form-control"
					id="pw"
					placeholder="비밀번호를 입력하세요."
					name="pw"
					value={form.pw}
					onChange={onFormChange}
					/>
					<img 
					className="password_secret"
					src={isPwSecret ? "/images/eye-off.png" : "/images/eye-on.png"}
					onClick={() => setIsPwSecret(!isPwSecret)}
					alt="비밀번호 보기" />
				</div>
				{
					
				}
			</div>
			<button
			className="btn btn-primary d-block mx-auto"
			onClick={onFormSubmit}
			>로그인</button>
		</>
	)
}