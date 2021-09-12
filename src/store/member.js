import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Member from '../common/member';
import axios from 'axios';

const member = new Member();

const setApiToken = token => {
	axios.defaults.headers['Authorization'] = token ? `Bearer ${token}` : '';
}

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
	error: null,
	token: '',
}

// 새로고침시 세션 정보를 가져오는 함수
function loadSessionInfo() {
	if (sessionStorage.getItem('basicInfo')) {
		const parsed = JSON.parse(sessionStorage.getItem('basicInfo'));
		initialState.basicInfo = parsed;
	}
	if (sessionStorage.getItem('token')) {
		const token = sessionStorage.getItem('token');
		initialState.token = token;
		setApiToken(token);
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
			state.error = null;
		})
		.addCase(login.fulfilled, (state, action) => {
			const {
				user_info,
				token,
			} = action.payload;
			state.basicInfo = user_info;
			state.token = token;
			state.isLoading = false;
			state.error = null;

			/* sessionStorage */
			sessionStorage.setItem('basicInfo', JSON.stringify(state.basicInfo));
			sessionStorage.setItem('token', token);
			
			/* axios */
			setApiToken(token);
		})
		.addCase(login.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		})
		.addCase(logout.pending, (state, action) => {
			state.isLoading = true;
			state.error = null;
		})
		.addCase(logout.fulfilled, (state, action) => {
			state.basicInfo = {};
			state.isLoading = false;
			state.error = null;
			
			/* sessionStorage */
			sessionStorage.removeItem('basicInfo');
			sessionStorage.removeItem('token');

			/* token */
			setApiToken();
		})
		.addCase(logout.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		})
	}
});

export const {
	sessionLogin,
} = memberSlice.actions;
export default memberSlice;