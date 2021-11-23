import cl from './LoadingModal.module.scss';

function LoadingModal() {

	//console.log('Render: LoadingModal');

	return (
		<div className={cl.loadingModal}>
			LOADING...
		</div>
	);
}

export default LoadingModal;