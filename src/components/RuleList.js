import React, { useEffect, useState } from 'react';
import { 
  Typography, 
  Card, 
  CardContent, 
  Box,
  Divider,
  CircularProgress,
  Chip
} from '@mui/material';
import { getRules } from '../services/api';

const Operator = ({ children }) => (
  <Chip 
    label={children} 
    color={children === 'AND' ? 'primary' : 'secondary'} 
    size="small" 
    sx={{ fontWeight: 'bold', mx: 0.5, my: 0.5 }} 
  />
);

const Condition = ({ condition }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mb: 1 }}>
    <Typography component="span" sx={{ fontWeight: 'bold', color: 'secondary.main', mr: 1 }}>
      {condition.attribute}
    </Typography>
    <Typography component="span" sx={{ mx: 0.5 }}>
      {condition.operator}
    </Typography>
    <Typography component="span" sx={{ fontStyle: 'italic', color: 'text.secondary', ml: 1 }}>
      {condition.value}
    </Typography>
  </Box>
);

const RuleGroup = ({ group, depth = 0 }) => (
  <Box sx={{ ml: depth * 2, mt: 1, p: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
    {group.conditions.map((item, index) => (
      <React.Fragment key={index}>
        {item.conditions ? (
          <RuleGroup group={item} depth={depth + 1} />
        ) : (
          <Condition condition={item} />
        )}
        {index < group.conditions.length - 1 && <Operator>{group.operator}</Operator>}
      </React.Fragment>
    ))}
  </Box>
);

const parseRule = (ruleString) => {
  const tokens = ruleString.match(/\(|\)|\w+\s*(?:>|<|=|>=|<=)\s*(?:'[^']*'|\d+|\w+)|AND|OR/g);
  const parseGroup = () => {
    const group = { conditions: [], operator: 'AND' };
    while (tokens.length > 0) {
      const token = tokens.shift();
      if (token === ')') break;
      if (token === '(') {
        group.conditions.push(parseGroup());
      } else if (token === 'AND' || token === 'OR') {
        group.operator = token;
      } else {
        const [attribute, operator, value] = token.split(/\s*(>|<|=|>=|<=)\s*/);
        group.conditions.push({ attribute, operator, value: value.replace(/'/g, '') });
      }
    }
    return group;
  };
  return parseGroup();
};

const RuleCard = ({ rule }) => {
  const parsedRule = parseRule(rule.ruleString);

  return (
    <Card variant="outlined" sx={{ mb: 2, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
          Rule
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <RuleGroup group={parsedRule} />
      </CardContent>
    </Card>
  );
};

const RuleList = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await getRules();
        setRules(response.data);
      } catch (err) {
        console.error('Error fetching rules:', err);
        setError('Failed to fetch rules. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchRules();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Rule List</Typography>
      {rules.length === 0 ? (
        <Typography>No rules found.</Typography>
      ) : (
        rules.map((rule) => (
          <RuleCard key={rule._id} rule={rule} />
        ))
      )}
    </Box>
  );
};

export default RuleList;
