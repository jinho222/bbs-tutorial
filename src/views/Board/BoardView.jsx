import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { usePostContext } from "../../common/common";
import Spinner from "../../components/Common/Spinner";

const BoardView = () => {
	/* hooks */
	const params = useParams();
	const postCtx = usePostContext();
	const history = useHistory();
	const { basicInfo } = useSelector(state => state.member);

	/* state */
	const [isLoading, setIsLoading] = useState(true);
	const [post, setPost] = useState({});

	/* methods */
	const onDelete = () => {
		const isCancel = window.confirm('정말 삭제하시겠습니까?');
		if (!isCancel) return;
		const formData = new FormData();
		formData.append('_id', post._id);
		postCtx.deletePost(formData).then(res => {
			alert('게시물이 삭제되었습니다.');
			history.push('/board-list');
		}).catch(e => {
			console.log(e);
			alert('서버상 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.');
		})
	}

	/* effect */
	useEffect(() => {
		setIsLoading(true);
		postCtx.getPost({...params}).then(res => {
			setPost(res);
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
				(Object.keys(post).length > 0) &&
				<>
					<div className="card">
						<article className="card-body">
							<h2 className="card-title">{ post.title }</h2>
							<p className="d-flex justify-content-between mt-1 align-items-center text-secondary">
								<span >{post.author_name}</span>
								<span>{post.date}</span>
							</p>
							<pre className="card-text post-content pt-3">{ post.content }</pre>
						</article>
					</div>
					<div className="d-flex justify-content-end mt-2">
						{
							(basicInfo.id === post.author_id) &&
							<>
								<Link
								className="btn btn-success"
								to={{
									pathname: '/board-write',
									state: { 
										status: 'edit',
										post: {...post},
									},
								}}>수정</Link>
								<button
								className="btn btn-danger ms-1"
								onClick={onDelete}>삭제</button>
							</>
						}
						<Link
						className="btn btn-secondary ms-1"
						to="/board-list">목록</Link>
					</div>
				</>
			}
		</>
	);
};

export default BoardView;