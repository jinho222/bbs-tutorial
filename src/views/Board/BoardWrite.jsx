import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Alert from "../../components/Common/Alert";
import { getTodayDate, usePostContext } from "../../common/common";
import Spinner from "../../components/Common/Spinner";
import { useEffect } from "react";

const BoardWrite = () => {
	/* hooks */
	const history = useHistory();
	const location = useLocation();
	const postCtx = usePostContext();
	const { basicInfo } = useSelector(state => state.member);

	/* state */
	const [form, setForm] = useState({
		title: '',
		content: '',
	});
	const [errorMsg, setErrorMsg] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	/* memo */
	const contentLength = useMemo(() => {
		return form.content.length;
	}, [form.content]);

	/* method */
	const onFormChange = e => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const goToList = () => {
		const isCancel = window.confirm('작성하고 계시던 글 내용은 저장되지 않습니다.\n목록으로 이동하시겠습니까?');
		if (!isCancel) return;
		history.push('/board-list');
	};

	const submitBoard = async () => {
		const { title, content } = form;
		const { _id, id, name } = basicInfo;
		const { status, post } = location.state;
		const formData = new FormData();
		formData.append('title', title);
		formData.append('content', content);
		formData.append('author_id', id);
		formData.append('author_name', name);
		
		setIsLoading(true);
		try {
			if (status === 'edit') {
				formData.append('_id', post._id);
				await postCtx.updatePost(formData);
			} else {
				formData.append('author_idx', _id);
				formData.append('date', getTodayDate());
				await postCtx.addPost(formData)
			}
			const msg = `게시물이 ${status === 'edit' ? '수정' : '등록'}되었습니다.`;
			alert(msg);
			setIsLoading(false);
			if (status === 'edit') history.push(`/board-view/${post._id}`);
			else history.push('/board-list');
		} catch (e) {
			console.log(e);
			setIsLoading(false);
			alert('서버상 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.');
		}
	}

	const onSubmit = () => {
		console.log('submit');
		const { title, content } = form;
		if (!title) {
			setErrorMsg('제목을 입력해주세요.');
		} else if (!content) {
			setErrorMsg('내용을 입력해주세요.');
		} else {
			setErrorMsg('');
			submitBoard();
		}
	}

	/* effects */
	useEffect(() => {
		const { status, post } = location.state;
		if (status !== 'edit') return;
		// 글 수정인 경우에만
		setForm({...post});
	}, [location]);

	/* template */
  return (
		<>
			<div className="card">
				<div className="card-header">
					<h2>글쓰기</h2>
				</div>
				<div className="card-body">
					{
						errorMsg.length > 0 &&
						<Alert msg={errorMsg}></Alert>
					}
					<div className="mb-3">
						<label htmlFor="title" className="form-label">제목</label>
						<input
						type="text"
						className="form-control"
						id="title"
						placeholder="제목"
						name="title"
						value={form.title}
						onChange={onFormChange}
						/>
					</div>
				<div>
						<label htmlFor="content" className="form-label">내용</label>
						<textarea
						className={`form-control board-write-textarea ${contentLength >= 500 ? 'input-error' : ''}`}
						id="content"
						placeholder="내용은 최대 500자까지 입력가능합니다."
						maxLength="500"
						name="content"
						value={form.content}
						onChange={onFormChange}
						></textarea>
						<p className={`text-end mb-0 mt-2 ${contentLength >= 500 ? 'input-error-msg' : ''}`}>
							{`${contentLength}/500`}
						</p>
					</div>
				</div>
			</div>
			<div className="d-flex justify-content-end mt-4">
				<button
				className="btn btn-secondary"
				onClick={goToList}
				>목록</button>
				<button
				className="btn btn-primary ms-2"
				onClick={onSubmit}
				>등록</button>
			</div>
			{
				isLoading && <Spinner></Spinner>
			}
		</>
	);
};

export default BoardWrite;