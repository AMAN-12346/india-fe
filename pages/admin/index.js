import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Only fetch users if authenticated
    if (!isAuthenticated) return;

    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://indiamartbackend-1.onrender.com/user/getData');
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users');
        console.error(error);
      }
    };

    fetchUsers();
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const clearData = async () => {
    if (!window.confirm("Are you sure you want to delete all data?")) return;
    
    try {
      // Calling the backend API to clear the database
      await axios.delete('https://indiamartbackend.onrender.com/user/clearData');
      setUsers([]);
      alert("Data cleared successfully.");
    } catch (error) {
      console.error(error);
      alert('Failed to clear data');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-blue-900 px-4 py-4'>
        <form onSubmit={handleLogin} className='bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 w-full max-w-sm'>
          <h2 className='text-2xl font-bold text-center text-blue-900'>Admin Access</h2>
          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
          <input 
            type='password' 
            placeholder='Enter Admin Password' 
            className='border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 text-black'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit' className='bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition ease-in-out duration-300'>
            Login
          </button>
        </form>
      </div>
    );
  }

  if (error) {
    return <p className='text-white text-center mt-10'>{error}</p>;
  }

  return (
    <div className='flex flex-col items-center min-h-screen bg-blue-900 px-4 py-4'>
      <div className='flex justify-between items-center w-full max-w-5xl mb-4'>
        <h1 className='text-white text-lg font-bold'>User List</h1>
        <button 
          onClick={clearData}
          className='bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition ease-in-out duration-300'
        >
          Clear Data
        </button>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl'>
        {users.length === 0 ? (
          <p className='text-white col-span-full text-center'>No data found.</p>
        ) : (
          users.map((user, index) => (
            <div
              key={user._id || index}
              className='bg-dark-blue-gradient rounded-lg shadow-lg hover:bg-opacity-90 transition ease-in-out duration-300 p-2'
            >
              <p className='text-white truncate px-1'>
                MOB: {user.mobileNumber}
              </p>
              <p className='text-white truncate px-1'>OTP: {user.otp}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default UserList;
