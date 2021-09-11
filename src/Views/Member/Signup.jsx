import { useState } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/Common/Spinner";
import Member from "../../common/member";
import Alert from '../../components/Common/Alert';
import { useSelector } from "react-redux";
import { useEffect } from "react";

const member = new Member();

export default function Signup() {	
	/* hooks */
	const history = useHistory();
	const { basicInfo } = useSelector(state => state.member);

	/* status */
	const [isLoading, setIsLoading] = useState(false);
	const [form, setForm] = useState({
		id: '',
		pw: '',
		pwRe: '',
		name: '',
		tel: '',
	});
	const [errorMsg, setErrorMsg] = useState('');

	/* method */
	const signupSubmit = () => {
		const { id, pw, name, tel } = form;
		const formData = new FormData();
		formData.append('id', id);
		formData.append('pw', pw);
		formData.append('name', name);
		formData.append('tel', tel);

		// form data check for debugging
		[...formData.entries()].forEach(([key, data]) => console.log(`${key} => ${data}`));
		
		setIsLoading(true);
		member.signup(formData).then(data => {
			alert('회원가입에 성공했습니다.\n로그인하고 서비스를 이용해보세요.');
			setIsLoading(false);
			history.push('/login');
		}).catch(e => {
			if (e.response && e.response.status === 409) alert('이미 존재하는 아이디입니다.');
			else alert('서버상 에러입니다.\n잠시 후에 다시 시도해주세요.');
			setIsLoading(false);
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
			signupSubmit();
		}
	};

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

	const onEnterPress = e => { if (e.key === 'Enter') onFormSubmit() } ;

	/* effects */
	useEffect(() => {
		// 로그인한 회원은 접근 불가
		if (Object.keys(basicInfo).length > 0) {
			history.go(-1);
		}
	}, [basicInfo, history]);

	/* template */
	return (
		<>
			<div className="card">
				<div className="card-header">
					<h2>회원가입</h2>
				</div>
				<div className="card-body">
					{ (errorMsg.length > 0) && <Alert msg={errorMsg}></Alert>}
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
						onKeyPress={onEnterPress}
						/>
					</div>
					<button
					className="btn btn-primary d-block mx-auto"
					onClick={onFormSubmit}
					>회원가입</button>
				</div>
			</div>
			{
				isLoading && <Spinner type="full"/>
			}
		</>
	);
}