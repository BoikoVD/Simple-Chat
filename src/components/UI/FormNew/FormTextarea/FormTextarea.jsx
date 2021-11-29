import cl from './FormTextarea.module.scss';

function FormTextarea({ setValue, setError, valueParam, errorParam, ...props }) {

	const change = (value) => {
		if (valueParam === errorParam && errorParam) {
			setError({});
		}
		setValue(value)
	}

	//console.log('Render: FormTextarea');

	return (
		<textarea
			className={valueParam === errorParam ? [cl.textarea, cl.invalid].join(' ') : cl.textarea}
			onChange={e => change(e.target.value)}
			{...props}
		></textarea>
	);
}

export default FormTextarea;