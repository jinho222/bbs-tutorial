import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/Common/Spinner";
import LoginForm from "../../components/Member/LoginForm";
import { login } from "../../store/member";

const Login = () => {	
	const history = useHistory();
	const { basicInfo, isLoading, isError } = useSelector(state => state.member);
	const dispatch = useDispatch();
	
	/* status */

	/* method */
	const loginSubmit = form => {
		const { id, pw } = form;
		const formData = new FormData();
		formData.append('id', id);
		formData.append('pw', pw);

		[...formData.entries()].forEach(([key, data]) => console.log(`${key} => ${data}`));

		dispatch(login(formData)).then()
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
					<LoginForm
					loginSubmit={loginSubmit}
					></LoginForm>
				</div>
			</div>
			{
				isLoading && <Spinner></Spinner>
			}
		</>
	);
}

export default Login;