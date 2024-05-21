import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    useTheme,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Paper,
    TextField,
    MenuItem, // Import MenuItem for the dropdown options
    Select // Import Select for the dropdown
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const EXTRA = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const data = [
        {
            "Project": '',
            "Env": '12',
            "BAT": 'A123',
            "Input Type CAG": 'P111',
            "Carrier ID": 'Reg233',
            "LOB": 'Reg233',
            "Run Mode": 'Reg233',
            "Pull Product": 'Reg233',
            "Pull GPI": 'Reg233',
            "Exclude Global Plans": 'Reg233',
            "Pull Termed CAG levels": 'Reg233',
            "Pull Inactive CAG levels": 'Reg233',
            "Pull Termed PLAN levels": 'Reg233',
            "Pull Inactive PLAN levels": 'Reg233',
            "Network": 'Reg233'
        }
    ];

    const renderTable = () => (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} sx={{ textAlign: "center" }}>SOT Parsed</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <React.Fragment key={index}>
                            {
                                Object.keys(item).map((key, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{key}</TableCell>
                                        {key === "Project" || key === "Network" ? (
                                            <TableCell>
                                                <TextField
                                                    value={item[key]}
                                                    onChange={(e) => handleTextFieldChange(e, key)}
                                                />
                                            </TableCell>
                                        ) : key === "Env" || key === "BAT" || key === "Input Type CAG" || key === "Carrier ID" || key === "LOB" ? (
                                            <TableCell style={{ backgroundColor: '#f0f0f0' }}>{item[key]}</TableCell>
                                        ) : (
                                            <TableCell>
                                                <Select
                                                    value={item[key]}
                                                    onChange={(e) => handleDropdownChange(e, key)}
                                                >
                                                    {/* Add options for Select components */}
                                                </Select>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))
                            }
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    // Function to handle dropdown changes
    const handleDropdownChange = (event, key) => {
        const { value } = event.target;
        // You can implement logic to handle the change here, such as updating the state
    };

    // Function to handle text field changes
    const handleTextFieldChange = (event, key) => {
        const { value } = event.target;
        // You can implement logic to handle the change here, such as updating the state
    };

    return (
        <Box m="10px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="EXTRA" />
            </Box>

            {/* GRID CONTAINER */}
            <Grid container spacing={2}>
                {/* LEFT PORTION */}
                <Grid item xs={8}>
                    <Box
                        p={2}
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                    >
                        <Divider
                            textAlign="left"
                            variant="middle"
                            sx={{
                                borderColor: "#3da58a",
                                "&::before, &::after": { borderColor: "#3da58a" },
                                color: "primary.main",
                                width: '100%'
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '1.25rem', // Increase font size
                                    fontWeight: 'bold'  // Make text bold
                                }}
                            >
                                Portion Left
                            </Typography>
                        </Divider>
                        {renderTable()}
                    </Box>
                </Grid>

                {/* RIGHT PORTION */}
                <Grid item xs={4}>
                    <Box p={2} backgroundColor={colors.primary[400]}>
                        <Divider
                            textAlign="left"
                            variant="middle"
                            sx={{
                                borderColor: "#3da58a",
                                "&::before, &::after": { borderColor: "#3da58a" },
                                color: "primary.main"
                            }}
                        >
                            Portion Right
                        </Divider>
                        <Grid container spacing={0}>
                            <Grid item xs={6}>
                                {renderTable()}
                            </Grid>
                            <Grid item xs={6}>
                                {renderTable()}
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EXTRA;
