import cl from './Burger.module.scss';

function Burger({ burgerRef, clickOnBurger, ...props }) {

	return (
		<button type="button" className={cl.iconMenu} ref={burgerRef} onClick={clickOnBurger} {...props}>
			<span></span>
			<span></span>
			<span></span>
		</ button>
	);
}

export default Burger;