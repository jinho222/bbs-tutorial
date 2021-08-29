import Header from "./components/Common/Header";
import {
	BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom';
import Home from './views/Home';
import Login from "./views/Member/Login";
import Signup from "./views/Member/Signup";
import BoardList from "./views/Board/BoardList";
import BoardWrite from "./views/Board/BoardWrite";
import BoardView from "./views/Board/BoardView";
import React from "react";
import Post from "./common/post";
import { useSelector } from "react-redux";
import AuthRoute from "./components/Common/AuthRoute";
import { useMemo } from "react";

const post = new Post();

export const PostContext = React.createContext(null);

export default function App() {
	/* hooks */
	const { basicInfo } = useSelector(state => state.member);

	/* memo */
	const isLogin = useMemo(() => {
		return Object.keys(basicInfo).length > 0
	}, [basicInfo]);


	return (
		<PostContext.Provider value={post}>
			<BrowserRouter>
				<Header></Header>
				<main className="container pt-4">
					<Switch>
						<Route exact path="/" component={Home}/>
						<Route path="/login" component={Login}/>
						<Route path="/signup" component={Signup}/>
						<Route path="/board-list" component={BoardList}/>
						<AuthRoute path="/board-write" component={BoardWrite} auth={isLogin}/>
						<AuthRoute path="/board-view/:postNo" component={BoardView} auth={isLogin}/>
					</Switch>
				</main>
			</BrowserRouter>
		</PostContext.Provider>
	)
}