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

const memberSlice = createSlice({
	name: 'member',
	initialState: {
		basicInfo: {},
		isLoading: false,
		isError: false,
	},
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
			console.log(JSON.stringify(state.basicInfo));
			sessionStorage.setItem('basicInfo', JSON.stringify(state.basicInfo));
		})
		.addCase(login.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
		})
	}
});

export const { sessionLogin } = memberSlice.actions;
export default memberSlice;