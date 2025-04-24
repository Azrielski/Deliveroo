import React, { useState } from 'react';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert(`Login with email: ${email}`);
    } else {
      alert(`Signup for ${name} with email: ${email}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="//logotyp.us/file/deliveroo.svg" alt="Deliveroo" className="h-24 w-auto" />
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`w-1/2 py-4 font-medium text-center ${
                isLogin ? 'text-teal-500 border-b-2 border-teal-500' : 'text-gray-500'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Log in
            </button>
            <button
              className={`w-1/2 py-4 font-medium text-center ${
                !isLogin ? 'text-teal-500 border-b-2 border-teal-500' : 'text-gray-500'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign up
            </button>
          </div>

          {/* Form content */}
          <div className="px-8 py-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-gray-800">
                  {isLogin ? 'Welcome back' : 'Create an account'}
                </h2>
                <p className="text-gray-600">
                  {isLogin
                    ? 'Log in to order your favorite food'
                    : 'Sign up to order delicious food from the best restaurants'}
                </p>
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isLogin ? "Your password" : "Create a password"}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white py-3 px-4 rounded-md hover:bg-teal-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  {isLogin ? 'Log in' : 'Create account'}
                </button>
                {isLogin && (
                  <p className="text-center mt-4 text-sm text-gray-500">
                    <a href="#" className="text-teal-500 hover:text-teal-600 text-sm">
                      Forgot your password?
                    </a>
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Social login options */}
          <div className="px-8 py-6 bg-gray-50">
            <div className="flex items-center mb-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">or continue with</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>

        {/* Terms and conditions */}
        <p className="text-xs text-center text-gray-500 mt-6 mb-4">
          By {isLogin ? 'logging in' : 'signing up'}, you agree to our{' '}
          <a href="#" className="text-teal-500 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-teal-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default AuthForm;