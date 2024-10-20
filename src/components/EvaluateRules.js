import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import { getRules, evaluateRules } from '../services/api';

const EvaluateRules = () => {
  const [rules, setRules] = useState([]);
  const [inputData, setInputData] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await getRules();
      setRules(response.data);
    } catch (err) {
      setError('Failed to fetch rules');
    }
  };

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleEvaluate = async () => {
    try {
      const data = JSON.parse(inputData);
      const response = await evaluateRules(data);
      const evaluationResults = response.data.results;
      
      const matchedResults = evaluationResults.map(result => {
        const matchedRule = rules.find(rule => rule._id === result.ruleId);
        return {
          ...result,
          ruleString: matchedRule ? matchedRule.ruleString : 'Rule not found'
        };
      });

      setResults(matchedResults);
      setError('');
    } catch (err) {
      setError('Failed to evaluate rules. Please check your input data.');
    }
  };

  const exampleInputs = [
    {
      label: 'Example 1',
      data: {
        data: {
          age: 45,
          department: 'Sales',
          salary: 60000,
          experience: 6
        }
      }
    },
    {
      label: 'Example 2',
      data: {
        data: {
          age: 28,
          department: 'Marketing',
          salary: 45000,
          experience: 3
        }
      }
    },
    {
      label: 'Example 3',
      data: {
        data: {
          age: 35,
          department: 'HR',
          salary: 55000,
          experience: 8
        }
      }
    }
  ];

  const insertExample = (example) => {
    setInputData(JSON.stringify(example.data, null, 2));
  };

  return (
    <Card variant="outlined" sx={{ mb: 2, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
          Evaluate Rules
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          fullWidth
          multiline
          rows={8}
          variant="outlined"
          label="Input Data (JSON)"
          value={inputData}
          onChange={handleInputChange}
          placeholder="Enter JSON data to evaluate"
          sx={{ mb: 2 }}
        />
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Example Inputs:
          </Typography>
          {exampleInputs.map((example, index) => (
            <Button
              key={index}
              variant="outlined"
              size="small"
              onClick={() => insertExample(example)}
              sx={{ mr: 1, mb: 1 }}
            >
              {example.label}
            </Button>
          ))}
        </Box>
        <Button variant="contained" color="primary" onClick={handleEvaluate}>
          Evaluate Rules
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        {results.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Evaluation Results:
            </Typography>
            <List>
              {results.map((result, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={`Rule ${index + 1}`}
                    secondary={result.ruleString}
                  />
                  <Chip
                    label={result.result ? 'Passed' : 'Failed'}
                    color={result.result ? 'success' : 'error'}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default EvaluateRules;
