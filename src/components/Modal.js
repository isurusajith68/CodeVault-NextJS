import { Close } from '@mui/icons-material';
import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, onClose, children }) => {
    const modalStyle = {
        content: {
            width: '50%',
            height: '80%',
            margin: 'auto',
        },
    };



    return (
        <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={onClose} contentLabel="PDF Modal" style={modalStyle}>
            <div onClick={onClose}>
                <Close />
            </div>
            {children}
        </Modal>
    );
};

export default CustomModal;
