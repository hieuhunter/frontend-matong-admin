import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { FaBook, FaRegCircle, FaTachometerAlt } from 'react-icons/fa';

import CustomImage from 'common/components/CustomImage';
import CustomLink from 'common/components/CustomLink';
import CustomToggle from 'common/components/CustomToggle';
import { useDispatch, useSelector } from 'react-redux';
import { checkloginAction } from 'redux/Action/loginAction';

const Sidebar = ({ wrapperRef }) => {
	const dispatch = useDispatch();
	const router = useHistory();
	const login = useSelector((state) => state.auth.login);

	useEffect(() => {
		dispatch(checkloginAction());
	}, [dispatch]);

	return (
		<div className='main-sidebar shadow-sm' ref={wrapperRef}>
			<div className='py-2 px-4 border-bottom border-secondary sidebar-header'>
				<CustomLink href='/' className='d-flex align-items-center text-white text-decoration-none'>
					<CustomImage className='rounded-circle' src='/images/logo.png' width={42} height={42} alt='Logo' />
					<span className='ms-2 fs-5 fw-bolder'>{login.user?.user_name}</span>
				</CustomLink>
			</div>
			<div className='px-2 py-3 sidebar-body'>
				<Accordion
					as='ul'
					className='list-group'
					defaultActiveKey={
						router.location.pathname === '/'
							? 'dashboard'
							: router.location.pathname === '/products/lists' || router.location.pathname === '/products/create'
							? 'products'
							: ''
					}
				>
					<li className='list-group-item border-0 p-0'>
						<CustomToggle
							eventKey='dashboard'
							className={classNames({
								'active-page': router.location.pathname === '/'
							})}
						>
							<>
								<FaTachometerAlt className='me-2 fs-5' /> Dashboard
							</>
						</CustomToggle>
						<Accordion.Collapse eventKey='dashboard'>
							<>
								<CustomLink
									href='/'
									className={classNames('d-flex align-items-center dropdown-item p-2 ps-4 mb-1', {
										'active-page': router.location.pathname === '/'
									})}
								>
									<FaRegCircle className='me-2 fs-5' /> Dashboard v1
								</CustomLink>
							</>
						</Accordion.Collapse>
					</li>
					<li className='list-group-item border-0 p-0'>
						<CustomToggle
							eventKey='products'
							className={classNames({
								'active-page':
									router.location.pathname === '/products/lists' || router.location.pathname === '/products/create'
							})}
						>
							<>
								<FaBook className='me-2 fs-5' /> Products
							</>
						</CustomToggle>
						<Accordion.Collapse eventKey='products'>
							<>
								<CustomLink
									href={`/products/lists`}
									className={classNames('d-flex align-items-center dropdown-item p-2 ps-4 mb-1', {
										'active-page': router.location.pathname === '/products/lists'
									})}
								>
									<FaRegCircle className='me-2 fs-5' /> Lists
								</CustomLink>
								<CustomLink
									href={`/products/create`}
									className={classNames('d-flex align-items-center dropdown-item p-2 ps-4 mb-1', {
										'active-page': router.location.pathname === '/products/create'
									})}
								>
									<FaRegCircle className='me-2 fs-5' /> Create
								</CustomLink>
								<CustomLink
									href={`/products/customer`}
									className={classNames('d-flex align-items-center dropdown-item p-2 ps-4 mb-1', {
										'active-page': router.location.pathname === '/products/customer'
									})}
								>
									<FaRegCircle className='me-2 fs-5' /> List_Customer
								</CustomLink>
								<CustomLink
									href={`/products/customer`}
									className={classNames('d-flex align-items-center dropdown-item p-2 ps-4 mb-1', {
										'active-page': router.location.pathname === '/products/bill'
									})}
								>
									<FaRegCircle className='me-2 fs-5' /> List_Bill
								</CustomLink>
							</>
						</Accordion.Collapse>
					</li>
				</Accordion>
			</div>
		</div>
	);
};

export default Sidebar;
