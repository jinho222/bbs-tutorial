import Header from "./Components/Common/Header";
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

const App = () => {
	return (
		<BrowserRouter>
			<Header></Header>
			<main className="container pt-4">
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/login" component={Login}/>
					<Route path="/signup" component={Signup}/>
					<Route path="/board-list" component={BoardList}/>
					<Route path="/board-write" component={BoardWrite}/>
				</Switch>
			</main>
		</BrowserRouter>
	)
}

export default App;