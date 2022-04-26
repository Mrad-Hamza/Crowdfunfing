import React from 'react';
import { Route} from 'react-router-dom';
import Dashboard from '../../components/Dashboard'


const PrivateRoute = () => {
	const isSigned = localStorage.getItem('token')
	const handleRoutes = () => {
		if (isSigned) {
			return <Route exact path="/" component={Dashboard}/>
		}
	};
	return handleRoutes();
};

export default PrivateRoute;
