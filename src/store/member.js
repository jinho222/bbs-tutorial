import { createAsyncThunk } from "@reduxjs/toolkit";
import Member from '../common/member';

const member = new Member();

// const fetchMemberInfo = createAsyncThunk(
// 	'member/signup',
// 	async (params) => {
// 		const res = await member.signup();
// 	}
// )