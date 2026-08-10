import React, { useState } from 'react';
import { uploadReceipt } from '../services/expenseService';
import './ReceiptUpload.css';

const ReceiptUpload = ({ onUploadSuccess, userId }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setMessage('Processing receipt using OCR...');

    try {
      await uploadReceipt(file, userId);
      setMessage('Receipt processed and expense saved successfully!');
      setFile(null);
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      console.error('Error uploading receipt:', error);
      setMessage('Failed to process receipt. Please try entering manually.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="receipt-upload-container">
      <h3>Upload Receipt (OCR)</h3>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={uploading || !file}>
          {uploading ? 'Scanning...' : 'Upload & Process'}
        </button>
      </form>
      {message && <p className="upload-message">{message}</p>}
    </div>
  );
};

export default ReceiptUpload;