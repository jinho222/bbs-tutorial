import { useMemo } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {	
	const history = useHistory();

	/* status */
	const [isPwSecret, setIsPwSecret] = useState(true);
	const [form, setForm] = useState({
		id: '',
		pw: '',
	});
	const [isShowAlert, setIsShowAlert] = useState(false);
	const invalidForm = useMemo(() => {
		const res = {
			status: false,
			msg: '',
		}

		const { id, pw } = form;

		if (!id) {
			res.status = false;
			res.msg = '아이디를 입력해주세요.';
		} else if (!pw) {
			res.status = false;
			res.msg = '비밀번호를 입력해주세요.';
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

	const loginSubmit = () => {
		if (!invalidForm.status) {
			setIsShowAlert(true);
			return;
		}

		history.push('/');
	};

	/* template */
	return (
		<>
			<div className="card">
				<div className="card-header">
					<h2>로그인</h2>
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
							isShowAlert && 
							<div className="alert alert-danger mt-4">
								{invalidForm.msg}
							</div>
						}
					</div>
					<button
					className="btn btn-primary d-block mx-auto"
					onClick={loginSubmit}
					>로그인</button>
				</div>
			</div>
		</>
	);
}

export default Login;