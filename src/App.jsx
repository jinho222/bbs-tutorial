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

const post = new Post();

export const PostContext = React.createContext(null);

export default function App() {
	
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
						<Route path="/board-write" component={BoardWrite}/>
						<Route path="/board-view/:postNo" component={BoardView}/>
					</Switch>
				</main>
			</BrowserRouter>
		</PostContext.Provider>
	)
}