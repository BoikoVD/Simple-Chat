import cl from './Form.module.scss';

const Form = ({ children }) => {

	console.log('Render: Form');

	return (
		<form className={cl.form}>
			{children}
		</form>
	);
}

export default Form;