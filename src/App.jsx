import Header from "./Components/Common/Header";
import {
	BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom';
import Home from '../src/Views/Home';

const App = () => {
	return (
		<BrowserRouter>
			<Header></Header>
			<Switch>
				<Route exact path="/" component={Home}/>
			</Switch>
		</BrowserRouter>
	)
}

export default App;