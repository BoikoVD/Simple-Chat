import { Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from './Pages/Login/Login';
import Registration from "./Pages/Registration/Registration";
import Chat from "./Pages/Chat/Chat";

function AppRouter() {
	const isAuth = useSelector(state => state.user.isAuth);

	console.log('Render: AppRouter');

	return (
		isAuth === false
			?
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/registration" element={<Registration />} />
				<Route path="*" element={<Login />} />
			</Routes>
			:
			<Routes>
				<Route path="/chat" element={<Chat />} />
			</Routes>
	);
}

export default AppRouter;