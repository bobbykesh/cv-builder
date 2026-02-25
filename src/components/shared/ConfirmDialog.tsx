'use client';

import React from 'react';
import styled from 'styled-components';
import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import { useUIStore } from '@/store/uiStore';

const DialogContent = styled.div`
  text-align: center;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.warning};
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  line-height: 2.6rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

const Message = styled.p`
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const ConfirmDialog: React.FC = () => {
  const { confirmDialog, hideConfirmDialog } = useUIStore();

  const handleConfirm = () => {
    if (confirmDialog.onConfirm) {
      confirmDialog.onConfirm();
    }
  };

  const handleCancel = () => {
    if (confirmDialog.onCancel) {
      confirmDialog.onCancel();
    } else {
      hideConfirmDialog();
    }
  };

  return (
    <Modal
      isOpen={confirmDialog.isOpen}
      onClose={handleCancel}
      maxWidth="400px"
      showCloseButton={false}
    >
      <DialogContent>
        <IconWrapper>
          <AlertTriangle size={48} />
        </IconWrapper>
        <Title>{confirmDialog.title}</Title>
        <Message>{confirmDialog.message}</Message>
        <ButtonGroup>
          <Button variant="outline" size="small" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" size="small" onClick={handleConfirm}>
            Confirm
          </Button>
        </ButtonGroup>
      </DialogContent>
    </Modal>
  );
};

export default ConfirmDialog;
