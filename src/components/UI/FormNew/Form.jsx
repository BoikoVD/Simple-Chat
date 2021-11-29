import cl from './Form.module.scss';

const Form = ({ children, ...props }) => {

	console.log('Render: Form');

	return (
		<form className={cl.form} {...props}>
			{children}
		</form>
	);
}

export default Form;