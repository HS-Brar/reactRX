import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';

const Extra = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const mockApiResponse = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const nextProgress = Math.min(progress + Math.floor(Math.random() * 30), 100);
        resolve({
          processId: 1,
          message: `${nextProgress}% completed`,
        });
      }, 1000);
    });
  };

  const checkProgress = async () => {
    try {
      const response = await mockApiResponse();
      const { message } = response;
      const percentage = parseInt(message.split('%')[0]);

      setProgress(percentage);

      if (percentage < 100) {
        setTimeout(checkProgress, 1000); // Retry after 1 second
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
      setLoading(false);
    }
  };

  const handleClick = () => {
    setLoading(true);
    setProgress(0);
    checkProgress();
  };

  return (
    <Box sx={{ width: '100%', padding: 2, textAlign: 'center' }}>
      <Button variant="contained" color="primary" onClick={handleClick} disabled={loading}>
        Start Process
      </Button>
      {loading && (
        <Box sx={{ mt: 2 }}>
          <CircularProgress variant="determinate" value={progress} />
          <Typography variant="body1" sx={{ mt: 1 }}>
            {progress}% completed
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Extra;
