import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/Common/Spinner";
import LoginForm from "../../components/Member/LoginForm";
import { login } from "../../store/member";

const Login = () => {	
	const history = useHistory();
	const { basicInfo, isLoading } = useSelector(state => state.memberReducer);
	const dispatch = useDispatch();
	
	/* status */

	/* method */
	const loginSubmit = form => {
		const { id, pw } = form;
		const formData = new FormData();
		formData.append('id', id);
		formData.append('pw', pw);

		[...formData.entries()].forEach(([key, data]) => console.log(`${key} => ${data}`));

		dispatch(login(formData))
	};

	/* effect */
	useEffect(() => {
		if (!isLoading && Object.keys(basicInfo).length > 0) {
			history.push('/')
		}
	}, [isLoading, basicInfo, history]);

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