import React from 'react';
import { Link } from 'react-router-dom';

const CustomLink = ({ className, href, children, ...props }) => (
	<Link to={href} className={className} {...props}>
		{children}
	</Link>
);

export default CustomLink;
