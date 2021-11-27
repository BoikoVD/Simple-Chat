import React from 'react';
import cl from './MessageList.module.scss';
import { useSelector } from 'react-redux';
import Message from './Message/Message';

function MessageList(props) {
	const currentUser = useSelector(state => state.user.userData);
	const activeRoom = useSelector(state => state.rooms.activeRoom);
	const room = useSelector(state => state.rooms.rooms).find(room => room._id === activeRoom._id);
	const messagesRef = React.useRef();

	React.useEffect(() => {
		messagesRef.current.scrollIntoView();
	}, [activeRoom]);
	React.useEffect(() => {
		messagesRef.current.scrollIntoView({ behavior: "smooth" });
	}, [room ? room.messages : null]);

	console.log('Render: MessageList');

	return (
		<div className={cl.messageListWrapper} >
			<div className={cl.messageList}  {...props}>
				{room
					?
					room.messages.map((message, index) => {
						return <Message message={message} currentUserId={currentUser._id} key={message.message + message.nickname + index} />
					})
					: null
				}
				<div ref={messagesRef}></div>
			</div>
		</div>
	);
}

export default MessageList;