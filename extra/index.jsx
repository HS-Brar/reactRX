import React, { useState } from 'react';
import { Button } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog'; // Adjust the path as necessary

const Extra2 = () => {
  const [open, setOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);

  const handleOpen = (action) => {
    setCurrentAction(action);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if (currentAction === 'one') {
      console.log('Action one performed');
      // Perform handleOne task
    } else if (currentAction === 'two') {
      console.log('Action two performed');
      // Perform handleTwo task
    } else if (currentAction === 'three') {
      console.log('Action three performed');
      // Perform handleThree task
    }
  };

  return (
    <>
      <Button onClick={() => handleOpen('one')} variant="contained" color="primary">
        One
      </Button>
      <Button onClick={() => handleOpen('two')} variant="contained" color="primary">
        Two
      </Button>
      <Button onClick={() => handleOpen('three')} variant="contained" color="primary">
        Three
      </Button>

      <ConfirmationDialog
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Confirm Action"
        message="Are you sure you want to perform this action?"
      />
    </>
  );
};

export default Extra2;
