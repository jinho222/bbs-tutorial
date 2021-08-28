import { useState } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/Common/Spinner";
import Member from "../../common/member";
import SignupForm from "../../components/Member/SignupForm";

const member = new Member();

export default function Signup() {	
	const history = useHistory();

	/* status */
	const [isLoading, setIsLoading] = useState(false);

	/* method */
	const signupSubmit = (form) => {
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

	/* template */
	return (
		<>
			<div className="card">
				<div className="card-header">
					<h2>회원가입</h2>
				</div>
				<div className="card-body">
					<SignupForm
					signupSubmit={signupSubmit}
					/>
				</div>
			</div>
			{
				isLoading && <Spinner/>
			}
		</>
	);
}