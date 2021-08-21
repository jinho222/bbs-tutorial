import { Link } from "react-router-dom";

const Home = () => {
	return (
		<>
			<div className="p-5 bg-light rounded-3">
				<div className="container-fluid py-5">
					<h2 className="display-5 fw-bold">환영합니다!</h2>
					<p className="col-md-8 fs-4">로그인하고 게시판을 이용해보세요 :)</p>
					<Link
					className="btn btn-success btn-lg"
					to="/login"
					>로그인하러가기</Link>
				</div>
			</div>
		</>
	)
};

export default Home;