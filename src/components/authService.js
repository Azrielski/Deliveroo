// API service to connect React frontend with Flask backend auth routes

const API_URL = 'http://localhost:5000/api/auth';

/**
 
 */
const authService = {
  /**
   * Register a new user
   * @param {Object} userData 
   * @returns {Promise} 
   */
  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      return { 
        success: response.ok,
        data,
        status: response.status
      };
    } catch (error) {
      console.error("Registration error:", error);
      return { 
        success: false, 
        data: { message: 'Network error occurred' },
        status: 500
      };
    }
  },

  /**
   * Verify user email
   * @param {string} token - Email verification token
   * @returns {Promise} - API response
   */
  verifyEmail: async (token) => {
  try {
    if (!token) {
      return { 
        success: false, 
        data: { message: "Missing verification token!" },
        status: 400
      };
    }

    const response = await fetch(`${API_URL}/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    
    return { 
      success: response.ok,
      data,
      status: response.status
    };
  } catch (error) {
    console.error("Email verification error:", error);
    return { 
      success: false, 
      data: { message: error.message || 'Network error occurred' },
      status: 500
    };
  }
},
 /**
 * Login a user
 * @param {Object} credentials - User login credentials
 * @returns {Promise} 
 */
login: async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    // If login successful, store token and user data
    if (response.ok && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      window.location.href = data.user.is_admin ? "/admin/dashboard" : "/user";



    }

    return { 
      success: response.ok,
      data,
      status: response.status
    };
  } catch (error) {
    console.error("Login error:", error);
    return { 
      success: false, 
      data: { message: 'Network error occurred' },
      status: 500
    };
  }
},

  /**
   * Logout the current user
   * @returns {Promise} 
   */
  logout: async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Clear local storage first
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      if (!token) {
        return { success: true };
      }
      
      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      return { 
        success: response.ok,
        data,
        status: response.status
      };
    } catch (error) {
      console.error("Logout error:", error);
      return { 
        success: false, 
        data: { message: 'Network error occurred' },
        status: 500
      };
    }
  },

  /**
   * Request password reset email
   * @param {Object} emailData - Email for password reset
   * @returns {Promise} 
   */
  requestPasswordReset: async (emailData) => {
    try {
      const response = await fetch(`${API_URL}/password-reset-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      
      const data = await response.json();
      return { 
        success: response.ok,
        data,
        status: response.status
      };
    } catch (error) {
      console.error("Password reset request error:", error);
      return { 
        success: false, 
        data: { message: 'Network error occurred' },
        status: 500
      };
    }
  },

  /**
   * Reset password
   * @param {Object} params - Token & new password
   * @returns {Promise} 
   */
  resetPassword: async ({ token, password, confirm_password }) => {
    try {
      if (!token) throw new Error("Missing reset token!");
      
      const response = await fetch(`${API_URL}/password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password, confirm_password }), 
      });
  
      const data = await response.json();
      return { 
        success: response.ok,
        data,
        status: response.status
      };
    } catch (error) {
      console.error("Password reset error:", error);
      return { 
        success: false, 
        data: { message: error.message || 'Network error occurred' },
        status: 500
      };
    }
  },
  
  /**
   * Resend verification email
   * @param {Object} emailData 
   * @returns {Promise} 
   */
  resendVerification: async (emailData) => {
    try {
      const response = await fetch(`${API_URL}/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      
      const data = await response.json();
      return { 
        success: response.ok,
        data,
        status: response.status
      };
    } catch (error) {
      console.error("Resend verification error:", error);
      return { 
        success: false, 
        data: { message: 'Network error occurred' },
        status: 500
      };
    }
  },

  /**
   * Check if user is authenticated
   * @returns {Boolean} - True if authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Get current user from localStorage
   * @returns {Object|null} 
   */
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Get auth token from localStorage
   * @returns {String|null} 
   */
  getToken: () => {
    return localStorage.getItem('token');
  }
  
};

export default authService;