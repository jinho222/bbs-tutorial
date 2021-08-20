import Header from "./Components/Common/Header";
import {
	BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom';
import Home from '../src/Views/Home';
import Login from "./Views/Member/Login";
import Signup from "./Views/Member/Signup";

const App = () => {
	return (
		<BrowserRouter>
			<Header></Header>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/login" component={Login}/>
				<Route path="/signup" component={Signup}/>
			</Switch>
		</BrowserRouter>
	)
}

export default App;