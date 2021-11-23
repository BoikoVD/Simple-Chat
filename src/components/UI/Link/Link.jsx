import React from 'react';
import { NavLink } from "react-router-dom";
import cl from './Link.module.scss';

function Link({ children, toLink }) {

	console.log('Render: Link');

	return (
		<div className={cl.linkWrapper}>
			<NavLink to={toLink} className={cl.link} >{children}</NavLink>
		</div>
	);
}

export default Link;