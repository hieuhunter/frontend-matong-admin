import EditProduct from 'containers/EditProduct';
import Login from 'containers/Login';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const HomePage = lazy(() => import('containers/HomePage'));
const CustomerPage = lazy(() => import('containers/CustomerPage'));
const BillPage = lazy(() => import('containers/BillPage'));
const ProductPage = lazy(() => import('containers/ProductPage'));
const CreateProductPage = lazy(() => import('containers/CreateProductPage'));

const Routes = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Router>
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route exact path='/products/lists' component={ProductPage} />
					<Route exact path='/products/customer' component={CustomerPage} />
					<Route exact path='/products/bill' component={BillPage} />
					<Route exact path='/products/create' component={CreateProductPage} />
					<Route exact path='/Admin/Login' component={Login} />
					<Route exact path='/products/edit/:productId' component={EditProduct} />
				</Switch>
			</Router>
		</Suspense>
	);
};

export default Routes;
