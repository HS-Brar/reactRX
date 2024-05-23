import React, { useState } from 'react';
import {
    Box,
    FormControl,
    Grid,
    TextField,
    Button,
    Select,
    MenuItem,
    Checkbox,
    InputLabel,
    OutlinedInput,
    ListItemText,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import * as Yup from 'yup';
import axios from 'axios';

const EXTRA = () => {

    const colors = tokens('light'); // You can manually pass 'light' or 'dark' mode here

    const [saveForm, setSaveForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: []
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSaveForm(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Clear validation errors when the user starts typing again
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleTagChange = (event) => {
        setSaveForm(prevState => ({
            ...prevState,
            role: event.target.value
        }));
    };

    const schema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required')
    });

    const validateForm = async () => {
        try {
            await schema.validate(saveForm, { abortEarly: false });
            setErrors({});
            return true;
        } catch (validationErrors) {
            const newErrors = {};
            validationErrors.inner.forEach(err => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
            return false;
        }
    };

    const handleSave = async () => {
        if (await validateForm()) {
            try {
                const response = await axios.post('YOUR_API_ENDPOINT', saveForm);
                console.log("Form data saved:", response.data);
                // Optionally, you can reset the form after saving
                setSaveForm({
                    firstName: '',
                    lastName: '',
                    email: '',
                    role: []
                });
            } catch (error) {
                console.error("Error:", error);
                // Handle error, display message to user, etc.
            }
        }
    };

    const names = ['Admin', 'Manager', 'User'];

    return (
        <Box m="10px">
            {/* HEADER */}
            <Header title="EXTRA" />

            {/* ROW 2 */}
            <Box
                gridColumn="span 8"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
            >
                <FormControl fullWidth>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                name='firstName'
                                label="First Name"
                                fullWidth
                                size='small'
                                color="secondary"
                                variant="outlined"
                                value={saveForm.firstName}
                                onChange={handleChange}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                name='lastName'
                                label="Last Name"
                                fullWidth
                                size='small'
                                color="secondary"
                                variant="outlined"
                                value={saveForm.lastName}
                                onChange={handleChange}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                name='email'
                                label="Email"
                                fullWidth
                                size='small'
                                color="secondary"
                                variant="outlined"
                                value={saveForm.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>
                    </Grid>
                </FormControl>
                <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Box>
            </Box>

            {/* Tag Selector */}
            <Box mt={2}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={saveForm.role}
                        onChange={handleTagChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={saveForm.role.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};

export default EXTRA;
