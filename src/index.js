import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/reset.css';
import './css/custom.css';
import store from './store';
import { Provider } from 'react-redux';
import { sessionLogin } from './store/member';

// 새로고침시 세션 정보를 가져오는 함수
function loadSessionInfo() {
	if (sessionStorage.getItem('basicInfo')) {
		const parsed = JSON.parse(sessionStorage.getItem('basicInfo'));
		store.dispatch(sessionLogin(parsed));
	}
}

loadSessionInfo();

ReactDOM.render(
	<Provider store={store}>
    <App />
	</Provider>,
  document.getElementById('root')
);