import React from 'react';
import { 
  Typography, 
  Card, 
  CardContent, 
  Box,
  Chip,
  Paper
} from '@mui/material';

const Operator = ({ children }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
    <Chip 
      label={children} 
      color={children === 'AND' ? 'primary' : 'secondary'} 
      size="small" 
      sx={{ 
        fontWeight: 'bold', 
        fontSize: '0.9rem',
        height: '24px'
      }} 
    />
  </Box>
);

const Condition = ({ condition }) => (
  <Box 
    sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      flexWrap: 'wrap', 
      p: 1,
      bgcolor: 'background.paper',
      borderRadius: 1,
      mb: 1
    }}
  >
    <Typography component="span" sx={{ fontWeight: 'bold', color: 'error.main', mr: 1 }}>
      {condition.attribute}
    </Typography>
    <Typography component="span" sx={{ mx: 0.5, fontWeight: 'bold' }}>
      {condition.operator}
    </Typography>
    <Typography component="span" sx={{ fontStyle: 'italic', color: 'text.secondary', ml: 1 }}>
      {condition.value}
    </Typography>
  </Box>
);

const RuleGroup = ({ group, depth = 0 }) => (
  <Paper 
    elevation={0}
    sx={{ 
      p: 1.5, 
      bgcolor: 'background.default',
      borderRadius: 1,
      mb: 1
    }}
  >
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
  </Paper>
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
    <Card 
      variant="outlined" 
      sx={{ 
        mb: 2, 
        bgcolor: 'background.paper', 
        boxShadow: 3, 
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Rule
        </Typography>
      </Box>
      <CardContent sx={{ pt: 2, bgcolor: 'background.default' }}>
        <RuleGroup group={parsedRule} />
      </CardContent>
    </Card>
  );
};

export default RuleCard;
