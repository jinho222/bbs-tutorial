import useSWR from "swr";
import Member from "./member";
import Post from './post';

const member = new Member();
const post = new Post();

export function useSignup(params) {
	const { data, error } = useSWR('/member/signup', member.signup(params));
	return { data, error };
}

export function useGetPostList(params) {
	return useSWR('/post/list', post.getList(params));
}