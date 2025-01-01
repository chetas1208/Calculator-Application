// filepath: /frontend/src/Api.js

const API_BASE_URL = 'http://localhost:5000/api';

export const calculate = async (operation, numbers) => {
  const response = await fetch(`${API_BASE_URL}/calculations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ operation, numbers }),
  });
  const data = await response.json();
  return data;
};

export const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  const response = await fetch(`${API_BASE_URL}/conversions/calculate`, { // Updated endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fromCurrency, toCurrency, amount }),
  });
  const data = await response.json();
  return data;
};

export const getCalculationHistory = async () => {
  const response = await fetch(`${API_BASE_URL}/calculations/history`);
  const data = await response.json();
  return data;
};

export const getConversionHistory = async () => {
  const response = await fetch(`${API_BASE_URL}/conversions/history`);
  if (!response.ok) {
    throw new Error('Failed to fetch conversion history.');
  }
  const data = await response.json();
  return data;
};