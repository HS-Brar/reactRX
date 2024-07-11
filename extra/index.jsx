import React from 'react';
import { Box, Tooltip, Button } from '@mui/material';

const Extra = () => {
  const handleDownload = async () => {
    try {
      // Create a Blob with some sample data
      const sampleData = 'This is a test file.';
      const blob = new Blob([sampleData], { type: 'text/plain' });

      // Create a URL for the Blob object
      const url = window.URL.createObjectURL(blob);
      
      // Create a link element, set its href to the Blob URL, and trigger a click to download the file
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sample-file.xlsm'); // replace with the desired file name and extension
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the file', error);
    }
  };

  return (
    <Box>
      <Tooltip title="Download Sample File">
        <Button variant="contained" onClick={handleDownload}>
          Download File
        </Button>
      </Tooltip>
    </Box>
  );
};

export default Extra;
