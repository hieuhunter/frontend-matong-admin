import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomLink from 'common/components/CustomLink';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { checkloginAction, logoutRequestedAction } from 'redux/Action/loginAction';

const Breadcrumb = ({ children }) => {
	const dispatch = useDispatch();
	const router = useHistory();
	const login = useSelector((state) => state.auth.login);

	useEffect(() => {
		dispatch(checkloginAction());
	}, [dispatch]);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logoutRequestedAction(router));
	};
	return (
		<div className='row'>
			<div className='col-sm-6'>
				<h3 className='mb-0'>{children}</h3>
			</div>
			<div className='col-sm-6'>
				<nav className='float-sm-end' aria-label='breadcrumb'>
					<ol className='breadcrumb mb-0'>
						<li className='breadcrumb-item'>
							<CustomLink href='/' className='text-decoration-none'>
								Home
							</CustomLink>
						</li>
						<li className='breadcrumb-item active' aria-current='page'>
							{children}
						</li>
						<li className='breadcrumb-item'>
							<Link to='/' onClick={handleLogout}>
								Logout
							</Link>
						</li>
					</ol>
				</nav>
			</div>
		</div>
	);
};

export default Breadcrumb;
