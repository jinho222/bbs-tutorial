import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Member from '../common/member';

const member = new Member();

export const login = createAsyncThunk(
	'member/info',
	async (params) => {
		const res = await member.login(params)
		return res;
	}
)

const memberSlice = createSlice({
	name: 'member',
	initialState: {
		basicInfo: {},
		isLoading: false,
	},
	extraReducers: builder => {
		builder
		.addCase(login.pending, (state, action) => {
			state.isLoading = true;
		})
		.addCase(login.fulfilled, (state, action) => {
			state.basicInfo = action.payload;
			state.isLoading = false;
		})
		.addCase(login.rejected, (state, action) => {
			state.isLoading = false;
			window.alert('아이디 또는 비밀번호가 잘못되었습니다.\n다시 시도해주세요.');
		})
	}
});

export default memberSlice;