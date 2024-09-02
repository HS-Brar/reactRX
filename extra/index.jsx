import React, { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const Extra4 = () => {
  // State to manage the checkbox's checked status
  const [checked, setChecked] = useState(false);

  // Handler for checkbox change
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // Task to perform when the label is clicked
  const handleLabelClick = () => {
    alert('Label clicked!');
    // You can replace this with any other task you want to perform
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            name="exampleCheckbox"
            color="primary"
          />
        }
        label={
          <span
            style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}
            onClick={handleLabelClick}
          >
            Check me
          </span>
        }
      />
    </div>
  );
};

export default Extra4;
