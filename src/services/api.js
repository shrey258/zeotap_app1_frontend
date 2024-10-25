import axios from 'axios';

const api = axios.create({
    baseURL: 'https://zeotap-app1-backend.vercel.app/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const createRule = (ruleData) => api.post('/rules/create', ruleData);
export const getRules = () => api.get('/rules');
export const combineRules = (combineData) => api.post('/rules/combine', combineData);
export const evaluateRules = (evaluationData) => api.post('/rules/evaluate', evaluationData);

export default api;
