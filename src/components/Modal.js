import { Close } from '@mui/icons-material';
import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, onClose, children }) => {
    const modalStyle = {
        content: {
            width: '80%',
            height: '95%',
            margin: 'auto',
        },
    };

    return (
        <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={onClose} contentLabel="PDF Modal" className="pdf-viewer">
            <div onClick={onClose}>
                <Close />
            </div>
            {children}
        </Modal>
    );
};

export default CustomModal;
