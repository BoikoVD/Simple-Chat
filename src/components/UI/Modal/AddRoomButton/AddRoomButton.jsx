import cl from './AddRoomButton.module.scss';

const AddRoomButton = (props) => {

	return (
		<button className={cl.addRoomButton} {...props}>
			+
		</button>
	);
}

export default AddRoomButton;