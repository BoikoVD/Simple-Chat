import cl from './Form.module.scss';

const Form = ({ children, ...props }) => {

	return (
		<form className={cl.form} {...props}>
			{children}
		</form>
	);
}

export default Form;