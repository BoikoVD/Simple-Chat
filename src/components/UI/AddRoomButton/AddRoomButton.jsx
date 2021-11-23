import cl from './AddRoomButton.module.scss';

const AddRoomButton = (props) => {


	//console.log('Render: AddRoomButton');

	return (
		<button className={cl.addRoomButton} {...props}>
			+
		</button>
	);
}

export default AddRoomButton;