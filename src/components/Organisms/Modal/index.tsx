import ReactModal from 'react-modal';

import { Button, ButtonsArea, Text, Title } from './style';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  ariaHideApp: boolean;
  title: string;
  text: string;
  handleNo: () => void;
  textNo: string;
  handleYes: () => void;
  textYes: string;
}

function Modal({
  isOpen,
  onRequestClose,
  ariaHideApp,
  title,
  text,
  handleNo,
  textNo,
  handleYes,
  textYes,
}: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={ariaHideApp}
    >
      <Title>{title}</Title>
      <Text>{text}</Text>
      <ButtonsArea>
        <Button type="button" onClick={() => handleNo()}>
          {textNo}
        </Button>
        <Button type="button" onClick={() => handleYes()}>
          {textYes}
        </Button>
      </ButtonsArea>
    </ReactModal>
  );
}

export default Modal;
