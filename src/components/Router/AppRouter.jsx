import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from '../Pages/Login/Login';
import Registration from "../Pages/Registration/Registration";
import Chat from "../Pages/Chat/Chat";
import RegistrationCompleteMessage from "../Pages/Registration/RegistrationCompleteMessage/RegistrationCompleteMessage";

function AppRouter() {
	const isAuth = useSelector(state => state.auth.isAuth);

	console.log('Render: AppRouter');

	if (isAuth) {
		return (
			<Routes>
				<Route path="/chat" element={<Chat />} />
				<Route path="*" element={<Navigate to="/chat" replace />} />
			</Routes>
		);
	} else {
		return (
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/registration" element={<Registration />} />
				<Route path="/registration/complete" element={<RegistrationCompleteMessage />} />
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		);
	}
}

export default AppRouter;