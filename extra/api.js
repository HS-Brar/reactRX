import axios from 'axios';
import { useState } from 'react';

const apiClient = axios.create({
    baseURL: 'http://10.197.8.17:2023/hmis/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Define a state variable to hold alert message and severity
const [alert, setAlert] = useState({ message: '', severity: '' });

apiClient.interceptors.response.use(
    response => {
        // Handle success response
        if (response.data.success) {
            setAlert({ message: response.data.message, severity: 'success' });
        }
        return response;
    },
    error => {
        // Handle error response
        if (error.response) {
            const errorMessage = error.response.data.message || 'An error occurred';
            setAlert({ message: errorMessage, severity: 'error' });
        } else {
            setAlert({ message: error.message || 'An error occurred', severity: 'error' });
        }
        return Promise.reject(error);
    }
);

const api = {
    get: (url, params) => {
        return apiClient.get(url, { params })
            .then(response => response.data)
            .catch(handleError);
    },
    post: (url, data) => {
        return apiClient.post(url, data)
            .then(response => response.data)
            .catch(handleError);
    },
    put: (url, data) => {
        return apiClient.put(url, data)
            .then(response => response.data)
            .catch(handleError);
    },
    delete: (url) => {
        return apiClient.delete(url)
            .then(response => response.data)
            .catch(handleError);
    },
};

const handleError = (error) => {
    if (error.response) {
        console.error(`API Error: ${error.response.status}, ${error.response.data.message}`);
    } else {
        console.error('API Error:', error.message);
    }
    throw error;
};

export { api as default, alert };
