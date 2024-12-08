export const makeRequest = async (endpoint, method = 'GET', data = {}, idToken = null, options = {}) => {
  const url = `https://project-whiteboardflow-1.onrender.com${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (idToken) {
    headers['Authorization'] = `Bearer ${idToken}`;
  }

  const config = {
    method: method,
    headers: headers,
    body: method === 'GET' ? null : JSON.stringify(data),
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error making request:', error);
    throw error;
  }
};

