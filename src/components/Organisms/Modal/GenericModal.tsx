import ReactModal from 'react-modal';

function GenericModal({ children, isOpen, onRequestClose, ariaHideApp }: any) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={ariaHideApp}
    >
      {children}
    </ReactModal>
  );
}

export default GenericModal;
