import Pagination from '../../components/Board/Pagination';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { usePostContext } from '../../common/common';
import Spinner from '../../components/Common/Spinner';
import { useCallback } from 'react';

const BoardList = () => {
	/* hooks */
	const history = useHistory();
	const postCtx = usePostContext();
	/* state */
	const [isLoading, setIsLoading] = useState(true);
	const [postList, setPostList] = useState([]);
	const [pageOption, setPageOption] = useState({});

	/* method */
	const goToBoardView = e => {
		const { index } = e.target.dataset;
		history.push(`/board-view/${index}`);
	}

	const fetchBoardList = useCallback((pageNo = 1) => {
		const params = { pageNo };
		setIsLoading(true);
		postCtx.getList(params).then(res => {
			console.log(res);
			const { postList, ...rest } = res;
			setPostList(postList);
			setPageOption(rest);
			setIsLoading(false);
		}).catch(e => {
			console.log(e);
			setIsLoading(false);
		});
	}, [postCtx]);

	/* effect */
	useEffect(() => {
		fetchBoardList();
	}, [postCtx, fetchBoardList]);

	if (isLoading) return <Spinner></Spinner>;

	return (
		<>
		<table className="table">
				<thead>
					<tr>
						<th scope="col">No.</th>
						<th scope="col">제목</th>
						<th scope="col">작성자</th>
						<th scope="col">날짜</th>
					</tr>
				</thead>
				<tbody>
					{
						(postList.length > 0 ) &&
						postList.map(post => {
							return (
								<tr key={post._id}>
									<th scope="row">{post._id}</th>
									<td className="board-list-title" data-index={post._id} onClick={goToBoardView}>
										{post.title}
									</td>
									<td>{post.author_name}</td>
									<td>{post.date}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
			<div className="d-flex justify-content-center position-relative">
			{
				postList.length > 0 &&
				<Pagination {...pageOption} fetchBoardList={fetchBoardList}/>
			}
			<Link
			className="btn btn-primary btn-write"
			to={{
				pathname: '/board-write',
				state: { status: 'write' },
			}}
			>글쓰기</Link>
		</div>
		</>
	)
};

export default BoardList;