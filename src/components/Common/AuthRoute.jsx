import { Route, Redirect } from "react-router-dom";

export default function AuthRoute({ component: Component, auth, ...rest }) {
	if (!auth) {
		alert('로그인한 회원만 이용 가능합니다.\n로그인하시고 서비스를 이용해보세요!')
	}

	return (
		<Route
		{...rest}
		render={props => auth
			? <Component {...props} />
			: <Redirect to="/login" {...props}/>
		}
		></Route>
	)
}
