import React from 'react';
import './UploadButton.css';

interface UploadButtonProps {
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onUpload }) => {
  return (
    <div className="upload-wrapper">
      <label className="custom-upload" htmlFor="fileInput">Upload</label>
      <input
        type="file"
        id="fileInput"
        className="file-upload"
        accept="image/*"
        onChange={onUpload}
      />
    </div>
  );
};

export default UploadButton;