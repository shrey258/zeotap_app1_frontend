import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',  // Adjust based on your backend setup
    headers: {
        'Content-Type': 'application/json'
    }
});

export const createRule = (ruleData) => api.post('/rules/create', ruleData);
export const getRules = () => api.get('/rules');
export const combineRules = (combineData) => api.post('/rules/combine', combineData);
export const evaluateRules = (evaluationData) => api.post('/rules/evaluate', evaluationData);

export default api;
