import React from 'react';
import Modal from '..//modal/Modal';
import Button from '../button/Button';

interface ConfirmDeleteModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  show,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal show={show} title="Confirm Delete" onClose={onClose}>
      <p>Are you sure you want to delete this certificate?</p>
      <Button onClick={onConfirm} variation="contained" size="medium">
        Confirm
      </Button>
      <Button onClick={onClose} variation="transparent" size="medium">
        Cancel
      </Button>
    </Modal>
  );
};

export default ConfirmDeleteModal;
