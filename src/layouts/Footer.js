import moment from 'moment';
import React from 'react';

import CustomImage from 'common/components/CustomImage';
import CustomLink from 'common/components/CustomLink';

const Footer = () => {
	return (
		<footer className='main-footer py-4 bg-light shadow border-top'>
			<div className='container-fluid'>
				<div className='row g-0'>
					<div className='col-12 text-center'>
						<CustomImage className='rounded-circle' src='/images/logo.png' width={50} height={50} alt='Logo' />
						<small className='d-block text-dark'>
							Copyright &copy; {moment().year()}
							<CustomLink
								target='_blank'
								rel='noopener noreferrer'
								href='https://twitter.com/de4th_zone'
								className='text-decoration-none'
							>
								{' '}
								hieu17dth1c
							</CustomLink>
						</small>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
