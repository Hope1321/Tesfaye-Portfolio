import api from './api';

interface LoginResponse {
  message: string;
  user: {
    _id: string;
    username: string;
    role: string;
  };
  token: string;
}

interface ErrorResponse {
  message: string;
  errors?: string[];
}

export const loginAdmin = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', { username, password });

    // Store token in localStorage (consider using httpOnly cookies in production)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      // Store user data (without sensitive info)
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error: any) {
    // Handle API errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorData: ErrorResponse = error.response.data;
      if (errorData.errors && errorData.errors.length > 0) {
        throw new Error(errorData.errors.join(', '));
      }
      throw new Error(errorData.message || 'Login failed');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something happened in setting up the request
      throw new Error(error.message || 'An error occurred');
    }
  }
};

export interface RegisterResponse {
  success: boolean;
  message: string;
  user: {
    _id: string;
    username: string;
    role: string;
  };
  token: string;
  error?: string;
  errors?: string[];
}

export const registerAdmin = async (username: string, password: string): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>('/auth/register', {
      username,
      password
    });

    // Check if the response indicates success
    if (response.data.success && response.data.token && response.data.user) {
      // Store token and user data on successful registration
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    }

    // If we get here, the response didn't indicate success
    throw new Error(response.data.message || 'Registration failed');
  } catch (error: any) {
    console.error('Registration error:', error);

    // Handle network errors
    if (error.message === 'Network Error') {
      throw new Error('Unable to connect to the server. Please check your internet connection.');
    }

    // Handle server validation errors
    if (error.response?.data?.errors) {
      const errorMessages = Array.isArray(error.response.data.errors)
        ? error.response.data.errors.join(', ')
        : error.response.data.errors;
      throw new Error(errorMessages || 'Validation failed');
    }

    // Handle other server errors
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    // Fallback error message
    throw new Error('Registration failed. Please try again.');
  }
};

export const logoutAdmin = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Always clear local storage even if the server logout fails
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};
