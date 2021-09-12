import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
	const { basicInfo } = useSelector(state => state.member);

	return (
		<>
			<div className="p-5 bg-light rounded-3">
				<div className="container-fluid py-5">
					{
						Object.keys(basicInfo).length > 0
						? <>
							<h2 className="display-5 fw-bold">{`${basicInfo.name}님, 안녕하세요!`}</h2>
							<p className="col-md-8 fs-4">게시판을 이용해보세요 :)</p>
							<Link
							className="btn btn-success btn-lg"
							to="/board-list"
							>글쓰러가기</Link>
						</>
						: <>
							<h2 className="display-5 fw-bold">환영합니다!</h2>
							<p className="col-md-8 fs-4">로그인하고 게시판을 이용해보세요 :)</p>
							<Link
							className="btn btn-success btn-lg"
							to="/login"
							>로그인하러가기</Link>
						</>
					}
				</div>
			</div>
		</>
	)
};