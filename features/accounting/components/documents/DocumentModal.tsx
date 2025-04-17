// src/features/accounting/components/documents/DocumentModal.tsx
import React from 'react';
import { Modal, Box, IconButton, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/FileDownload';
import {
  DocumentModalOverlay,
  DocumentModalContainer,
  DocumentModalHeader,
  DocumentModalContent,
  DocumentModalFooter,
  DocumentModalClose,
  DocumentModalDownloadButton,
  DocumentModalCloseButton,
} from '../AccountingStyles';
import DocumentPreview from './DocumentPreview';

interface DocumentModalProps {
  open: boolean;
  onClose: () => void;
  document: any;
}

const DocumentModal: React.FC<DocumentModalProps> = ({ open, onClose, document }) => {
  const handleDownload = () => {
    // Логика скачивания PDF
    alert(`Скачивание документа ${document.number}...`);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <DocumentModalOverlay>
        <DocumentModalContainer>
          <DocumentModalHeader>
            <Typography variant="h6">Просмотр документа #{document.number}</Typography>
            <DocumentModalClose onClick={onClose}>
              <CloseIcon />
            </DocumentModalClose>
          </DocumentModalHeader>
          <DocumentModalContent>
            <DocumentPreview document={document} />
          </DocumentModalContent>
          <DocumentModalFooter>
            <DocumentModalDownloadButton
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
            >
              Скачать PDF
            </DocumentModalDownloadButton>
            <DocumentModalCloseButton onClick={onClose}>
              Закрыть
            </DocumentModalCloseButton>
          </DocumentModalFooter>
        </DocumentModalContainer>
      </DocumentModalOverlay>
    </Modal>
  );
};

export default DocumentModal;