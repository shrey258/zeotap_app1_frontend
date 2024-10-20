import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Card,
  CardContent,
  Divider,
  Tooltip,
  IconButton,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { createRule } from '../services/api';

const RuleForm = () => {
    const [ruleString, setRuleString] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createRule({ruleString});
            setSnackbarMessage('Rule created successfully!');
            setOpenSnackbar(true);
            setRuleString('');
        } catch (error) {
            console.error('Error creating rule:', error);
            setSnackbarMessage('Error creating rule');
            setOpenSnackbar(true);
        }
    };

    const exampleRules = [
        "age > 30 AND department = 'Sales'",
        "(age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')",
        "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
    ];

    const insertExample = (example) => {
        setRuleString(example);
    };

    return (
        <Card variant="outlined" sx={{ mb: 2, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                        Create New Rule
                    </Typography>
                    <Tooltip title="Enter your rule using conditions and logical operators (AND, OR). Use parentheses for complex rules.">
                        <IconButton>
                            <HelpOutlineIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        label="Rule"
                        value={ruleString}
                        onChange={(e) => setRuleString(e.target.value)}
                        placeholder="Enter your rule here..."
                        required
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Example Rules:
                        </Typography>
                        {exampleRules.map((example, index) => (
                            <Button
                                key={index}
                                variant="outlined"
                                size="small"
                                onClick={() => insertExample(example)}
                                sx={{ mr: 1, mb: 1 }}
                            >
                                Example {index + 1}
                            </Button>
                        ))}
                    </Box>
                    <Button type="submit" variant="contained" color="primary">
                        Create Rule
                    </Button>
                </form>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                    message={snackbarMessage}
                />
            </CardContent>
        </Card>
    );
};

export default RuleForm;
