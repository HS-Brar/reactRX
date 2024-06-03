import React, { useState, useRef } from 'react';
import { Box, Button, TextField } from '@mui/material';

const Extra = () => {
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileName(selectedFile.name);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      fetch('your-backend-url', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          console.log('File uploaded successfully');
          // Optionally, handle any further actions after successful upload
        } else {
          console.error('Failed to upload file');
        }
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
    }
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <input type="file" onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} accept=".xls,.xlsx" />
      <TextField
        value={fileName}
        label="Choose File"
        fullWidth
        onClick={handleFileButtonClick}
        InputProps={{ readOnly: true, style: { cursor: 'pointer' } }}
      />
      <Button onClick={handleUpload} variant="contained" color="primary">Upload</Button>
    </Box>
  );
};

export default Extra;
