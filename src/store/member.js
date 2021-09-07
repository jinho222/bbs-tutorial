import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Member from '../common/member';

const member = new Member();

export const login = createAsyncThunk(
	'login',	
	async (params) => {
		const res = await member.login(params)
		return res;
	}
)

export const logout = createAsyncThunk(
	'logout',	
	async (params) => {
		const res = await member.logout(params)
		return res;
	}
)

const initialState = {
	basicInfo: {},
	isLoading: false,
	isError: false,
}

// 새로고침시 세션 정보를 가져오는 함수
function loadSessionInfo() {
	if (sessionStorage.getItem('basicInfo')) {
		const parsed = JSON.parse(sessionStorage.getItem('basicInfo'));
		initialState.basicInfo = parsed;
	}
}

loadSessionInfo();

const memberSlice = createSlice({
	name: 'member',
	initialState,
	reducers: {
		sessionLogin(state, action) {
			state.basicInfo = action.payload;
		}
	},
	extraReducers: builder => {
		builder
		.addCase(login.pending, (state, action) => {
			state.isLoading = true;
			state.isError = false;
		})
		.addCase(login.fulfilled, (state, action) => {
			state.basicInfo = action.payload;
			state.isLoading = false;
			state.isError = false;

			/* sessionStorage */
			sessionStorage.setItem('basicInfo', JSON.stringify(state.basicInfo));
		})
		.addCase(login.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
		})
		.addCase(logout.pending, (state, action) => {
			state.isLoading = true;
			state.isError = false;
		})
		.addCase(logout.fulfilled, (state, action) => {
			state.basicInfo = {};
			state.isLoading = false;
			state.isError = false;
			
			/* sessionStorage */
			sessionStorage.removeItem('basicInfo');
		})
		.addCase(logout.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
		})
	}
});

export const { sessionLogin } = memberSlice.actions;
export default memberSlice;