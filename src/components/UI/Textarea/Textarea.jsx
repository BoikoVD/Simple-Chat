import cl from './Textarea.module.scss';

function Textarea(props) {

	//console.log('Render: Textarea');

	return (
		<textarea className={cl.textarea} {...props}></textarea>
	);
}

export default Textarea;