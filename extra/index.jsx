import * as React from "react";
import { Box, Grid, useTheme } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { tokens } from "../../theme";
import Header from "../../components/Header";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    padding: theme.spacing(1),
    border: '1px solid black', // Adding border to the table cell
    textAlign: "center",
    backgroundColor: "#FF612B"
}));

const CustomTableHeaderCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(1),
    border: '1px solid black', // Adding border to the table cell
    textAlign: "center",
    backgroundColor: "#FAF8F2"
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(1),
    border: '1px solid black', // Adding border to the table cell
    textAlign: "center",
    backgroundColor: "#D3D3D3"
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    //borderBottom: '1px solid black', // Optional: adding bottom border to the row
}));

const EXTRA = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const data = [
        { Platform: 'A1', Carrier: '12', Code: 'A123', Plan: 'P111', Reg: 'Reg233' }
    ];

    return (
        <Box m="10px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="EXTRA" />
            </Box>

            {/* ROW 2 */}
            <Box
                gridColumn="span 8"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                p={2}
            >
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <StyledTableRow>
                                        <CustomTableHeaderCell colSpan={2}>SOT Header</CustomTableHeaderCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((item, index) => (
                                        <React.Fragment key={index}>
                                            {Object.keys(item).map((key, index) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell>{key}</StyledTableCell>
                                                    <CustomTableCell>{item[key]}</CustomTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default EXTRA;
