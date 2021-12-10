import React from 'react';
import { Link } from "react-router-dom";
import cl from './CustomLink.module.scss';

function CustomLink({ children, to }) {

	return (
		<div className={cl.linkWrapper}>
			<Link to={to} className={cl.link} >{children}</Link>
		</div>
	);
}

export default CustomLink;