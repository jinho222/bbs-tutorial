import { useContext } from "react";
import { PostContext } from "../App";

export function getTodayDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = `0${today.getMonth() + 1}`.slice(-2);
	const date = `0${today.getDate()}`.slice(-2);
	return `${year}-${month}-${date}`;
}

export function usePostContext() {
	return useContext(PostContext)
}