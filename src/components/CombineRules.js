import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Button, Box, Typography, Snackbar, CircularProgress } from '@mui/material';
import { combineRules, getRules } from '../services/api';

const CombineRules = () => {
    const [rules, setRules] = useState([]);
    const [selectedRules, setSelectedRules] = useState([]);
    const [operator, setOperator] = useState('OR');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRules = async () => {
            try {
                const response = await getRules();
                setRules(response.data);
            } catch (error) {
                console.error('Error fetching rules:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRules();
    }, []);

    const handleCombine = async (e) => {
        e.preventDefault();
        try {
            await combineRules({ rules: selectedRules, operator });
            setSnackbarMessage('Rules combined successfully!');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error combining rules:', error);
            setSnackbarMessage('Error combining rules');
            setOpenSnackbar(true);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Combine Rules</Typography>
            <form onSubmit={handleCombine}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Select Rules</InputLabel>
                    <Select
                        multiple
                        value={selectedRules}
                        onChange={(e) => setSelectedRules(e.target.value)}
                        label="Select Rules"
                    >
                        {rules.map(rule => (
                            <MenuItem key={rule._id} value={rule._id}>{rule.ruleString}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Operator</InputLabel>
                    <Select
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                        label="Operator"
                    >
                        <MenuItem value="OR">OR</MenuItem>
                        <MenuItem value="AND">AND</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Combine Rules
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default CombineRules;
