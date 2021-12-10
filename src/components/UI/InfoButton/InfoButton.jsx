import cl from './InfoButton.module.scss';

const InfoButton = ({ color, ...props }) => {

	const styleClass = (
		color === "white" ? [cl.infoButton, cl.white].join(' ')
			:
			color === "black" ? [cl.infoButton, cl.black].join(' ')
				:
				cl.infoButton
	)

	return (
		<button className={styleClass} {...props}>
			<span></span>
			<span></span>
			<span></span>
		</button>
	);
}

export default InfoButton;