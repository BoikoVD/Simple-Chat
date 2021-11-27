import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function RequireAuth({ children }) {
	const location = useLocation();
	const isAuth = useSelector(state => state.auth.isAuth);

	console.log('Render: RequireAuth');

	if (isAuth) {
		return children
	} else {
		return <Navigate to="/login" state={{ from: location }} />
	}

}

export default RequireAuth;