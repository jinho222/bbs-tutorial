import { Link, useParams } from "react-router-dom";

const BoardView = () => {
	const params = useParams();

	console.log(params.postNo);

	return (
		<>
			<div className="card">
				<article className="card-body">
					<h2 className="card-title">제목입니다제목입니다제목입니다제목입니다</h2>
					<pre className="card-text">내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다</pre>
				</article>
			</div>
			<div className="d-flex justify-content-end mt-2">
				<Link
				className="btn btn-secondary"
				to="/board-list">목록</Link>
			</div>
		</>
	);
};

export default BoardView;