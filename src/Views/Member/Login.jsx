import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {	
	const [isPwSecret, setIsPwSecret] = useState(true);
	const [form, setForm] = useState({
		id: '',
		pw: '',
	});
	const [invalidMsg, setinvalidMsg] = useState('');
	
	const history = useHistory();

	const onFormChange = e => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	}

	const loginSubmit = () => {
		if (!form.id) {
			setinvalidMsg('아이디를 입력해주세요');
			return;
		} else if (!form.pw) {
			setinvalidMsg('비밀번호를 입력해주세요');
			return;
		} else {
			history.push('/');
		}
	};

	return (
		<div className="container pt-4">
			<div className="card">
				<div className="card-header">
					<h2 className="mb-0">로그인</h2>
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
							invalidMsg && 
							<div className="alert alert-danger mt-4">
								{invalidMsg}
							</div>
						}
					</div>
					<button
					className="btn btn-primary d-block mx-auto"
					onClick={loginSubmit}
					>로그인</button>
				</div>
			</div>
		</div>
	);
}

export default Login;