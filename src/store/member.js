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
		})
		.addCase(login.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
		})
	}
});

export default memberSlice;