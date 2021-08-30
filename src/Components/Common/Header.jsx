import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../store/member";

export default function Header() {
	/* hooks */
	const { basicInfo } = useSelector(state => state.member);
	const dispatch = useDispatch();
	const history = useHistory();
	
	/* method */
	const onLogout = () => {
		dispatch(logout()).then(() => {
			alert('로그아웃되었습니다.');
			history.push('/');
		}).catch(e => console.log(e));
	};
	
	const isLogin = Object.keys(basicInfo).length > 0;

	return (
		<nav className="navbar navbar-expand-md navbar-dark bg-primary">
			<div className="container-fluid">
				<h1 className="d-flex">
					<Link className="navbar-brand" to="/">BBS</Link>
				</h1>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link active" to="/">홈</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link active" to="/board-list">게시판</Link>
						</li>
						{
							isLogin
							? <li className="nav-item">
								<button
								className="nav-link active" 
								onClick={onLogout}
								>로그아웃</button>
							</li>
							: <>
								<li className="nav-item">
									<Link className="nav-link active" to="/signup">회원가입</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link active" to="/login">로그인</Link>
								</li>
							</>
						}
					</ul>
				</div>
			</div>
		</nav>
	)
}