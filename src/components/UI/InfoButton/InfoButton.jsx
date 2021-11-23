import cl from './InfoButton.module.scss';

const InfoButton = ({ ...props }) => {

	//console.log('Render: InfoButton');

	return (
		<button className={cl.infoButton} {...props}>
			<span></span>
			<span></span>
			<span></span>
		</button>
	);
}

export default InfoButton;