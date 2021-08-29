import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { usePostContext } from "../../common/common";
import Spinner from "../../components/Common/Spinner";

const BoardView = () => {
	/* hooks */
	const params = useParams();
	const postCtx = usePostContext();

	/* state */
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState({});

	/* effect */
	useEffect(() => {
		setIsLoading(true);
		postCtx.getPageDetail({...params}).then(res => {
			console.log(res);
			setPage(res);
			setIsLoading(false);
		}).catch(e => {
			console.log(e);
			setIsLoading(false);
		});
	}, [params, postCtx]);

	if (isLoading) return <Spinner></Spinner>;

	return (
		<>
			{
				(Object.keys(page).length > 0) &&
				<>
					<div className="card">
						<article className="card-body">
							<h2 className="card-title">{ page.title }</h2>
							<p className="d-flex justify-content-between mt-1 align-items-center text-secondary">
								<span >{page.author_name}</span>
								<span>{page.date}</span>
							</p>
							<pre className="card-text page-content pt-3">{ page.content }</pre>
						</article>
					</div>
					<div className="d-flex justify-content-end mt-2">
						<Link
						className="btn btn-secondary"
						to="/board-list">목록</Link>
					</div>
				</>
			}
		</>
	);
};

export default BoardView;