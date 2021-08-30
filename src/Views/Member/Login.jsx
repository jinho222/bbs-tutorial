import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Alert from "../../components/Common/Alert";
import Spinner from "../../components/Common/Spinner";
import { login } from "../../store/member";

const Login = () => {	
	/* hooks */
	const history = useHistory();
	const { basicInfo, isLoading, isError } = useSelector(state => state.member);
	const dispatch = useDispatch();
	
	/* status */
	const [form, setForm] = useState({
		id: '',
		pw: '',
	});
	const [isPwSecret, setIsPwSecret] = useState(true);
	const [errorMsg, setErrorMsg] = useState('');

	/* method */
	const loginSubmit = () => {
		const { id, pw } = form;
		const formData = new FormData();
		formData.append('id', id);
		formData.append('pw', pw);

		[...formData.entries()].forEach(([key, data]) => console.log(`${key} => ${data}`));

		dispatch(login(formData)).then()
	};

	const onSubmit = () => {
		if (!form.id) {
			setErrorMsg('아이디를 입력해주세요.');
		} else if (!form.pw) {
			setErrorMsg('비밀번호를 입력해주세요.');
		} else {
			setErrorMsg('');
			loginSubmit();
		}
	}

	const onFormChange = e => {
		const { name, value } = e.target;

		setForm({
			...form,
			[name]: value,
		});
	};

	/* effect */
	useEffect(() => {
		if (!isLoading) {
			if (isError) {
				alert('아이디 또는 비밀번호가 잘못되었습니다.\n다시 시도해주세요.');
			} else if (Object.keys(basicInfo).length > 0) { // 로그인 성공시
				history.push('/')
			}
		}
	}, [basicInfo, isLoading, isError, history]);

	/* template */
	return (
		<>
			<div className="card">
				<div className="card-header">
					<h2>로그인</h2>
				</div>
				<div className="card-body">
					{ errorMsg.length > 0 && <Alert msg={errorMsg}></Alert> }
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
							src={isPwSecret ? "/images/eye-on.png" : "/images/eye-off.png"}
							onClick={() => setIsPwSecret(!isPwSecret)}
							alt="비밀번호 보기" />
						</div>
					</div>
					<button
					className="btn btn-primary d-block mx-auto"
					onClick={onSubmit}
					>로그인</button>
				</div>
			</div>
			{
				isLoading && <Spinner type="full"></Spinner>
			}
		</>
	);
}

export default Login;