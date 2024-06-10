import React, { useRef } from 'react';
import { Box, TextField, Button } from '@mui/material';

const Extra = () => {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileNameParts = file.name.split('.');
      const fileExtension = fileNameParts[fileNameParts.length - 1];
      if (fileExtension === 'xls' || fileExtension === 'xlsx') {
        setSelectedFileName(file.name);
        setSelectedFile(file); // Store the selected file
      } else {
        setSelectedFileName(''); // Clear the selected file name if it's not the correct format
        setSelectedFile(null); // Clear the selected file
        alert('Please select a .xls or .xlsx file.');
      }
    }
  };

  const handleTextFieldClick = () => {
    fileInputRef.current.click();
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      alert('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('YOUR_BACKEND_API_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('File uploaded successfully:', result);
        // Handle success response
      } else {
        console.error('File upload failed:', response.statusText);
        // Handle error response
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error
    }
  };

  return (
    <Box>
      <TextField
        label="Click Here"
        value={selectedFileName}
        onClick={handleTextFieldClick}
        InputProps={{ readOnly: true }}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".xls,.xlsx"
        onChange={handleFileInputChange}
      />
      <Button 
        variant="contained" 
        onClick={uploadFile}
        disabled={!selectedFile} // Disable button if no file is selected
        sx={{ marginTop: 2 }}
      >
        Upload
      </Button>
    </Box>
  );
};

export default Extra;
