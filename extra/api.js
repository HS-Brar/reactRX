import { useState } from 'react';
import axios from 'axios';

const useAlert = () => {
    const [alert, setAlert] = useState({ message: '', severity: '' });

    const showAlert = (message, severity) => {
        setAlert({ message, severity });
    };

    const clearAlert = () => {
        setAlert({ message: '', severity: '' });
    };

    return { alert, showAlert, clearAlert };
};

const apiClient = axios.create({
    baseURL: 'http://10.197.8.17:2023/hmis/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

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

export { api as default, useAlert };
